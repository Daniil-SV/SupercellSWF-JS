import { SupercellSWF } from '../swf';
import { Matrix } from '../transforms/matrix';
import Image, { ImageKind } from 'image-js';
import { ScBuffer } from '../buffer';
import { ClassConstructor, Points } from '../interfaces';

/**
 * Graphic object or 2D mesh. Uses textures to "cut" sprite and use it in Shape
 * @category Shape
 */
export class ShapeDrawCommand {
	/**
	 * Texture index in SupercellSWF.textures.
	*/
	textureIndex = 0;

	/**
	 * Coordinates for view from the game.
	 * Must contain at least 3 point.
	*/
	xyCoords: Points = [];

	/**
	 * {@link https://en.wikipedia.org/wiki/UV_mapping UV} texture coordinates.
	 *  Please note, they can be normalized, and to get points on texture, you may need to use "denormalize" method.
	 *  Must contain at least 3 point.
	 */
	uvCoords: Points = [];

	/**
	 * @experimental It is still not very clear why this boolean is needed,
	 *  most likely it is to specify "MaxRects" sprite packing method
	 */
	maxRects = false;

	/**
	 * Shows if UV is normalized.
	 */
	normalized = false;

	constructor(options?: Partial<ShapeDrawCommand>) {
		Object.assign(this, options);
	}

	/**
	 * Calculates nearest angle between DrawCommand coordinates. Custom coordinates can also be specified for special cases.
	 * @param uv UV coordinates
	 * @param xy XY coordinates
	 * @returns Returns a list that consists of
	 *  nearest rotation angle and a boolean that determines if sprite should flip along X axis
	 */
	static getNearest(uv: Points, xy: Points): [number, boolean] {
		function isClockwise(points: Points) {
			let pointSum = 0;
			for (let x = 0; points.length > x; x++) {
				let x1, x2, y1, y2;
				[x1, y1] = points[(x + 1) % points.length];
				[x2, y2] = points[x];
				pointSum += (x1 - x2) * (y1 + y2);
			}
			return pointSum > 0;
		}

		function radToDegree(radians: number) {
			return radians * (180 / Math.PI);
		}

		const uv_cw = isClockwise(uv);
		const xy_cw = isClockwise(xy);

		const mirroring = !(uv_cw === xy_cw);
		const dx = xy[1][0] - xy[0][0];
		const dy = xy[1][1] - xy[0][1];
		const du = uv[1][0] - uv[0][0];
		const dv = uv[1][1] - uv[0][1];

		const angle_xy = radToDegree(Math.atan2(dy, dx)) % 360;
		const angle_uv = radToDegree(Math.atan2(dv, du)) % 360;

		let angle = (angle_xy - angle_uv + 360) % 360;

		if (mirroring) {
			angle -= 180;
		}

		if (angle < 0) {
			angle = 360 - Math.abs(angle);
		}

		return [Math.round(angle / 90) * 90, mirroring];

	}

	/**
	 * Calculates a bounding box for coordinates
	 * @param coords coordinates from which you need to get box
	 * @returns List with values in format [x, y, width, height]
	 */
	static getBoundingBox(coords: Points): [number, number, number, number] {
		const xCoords = coords.map(function (point) { return point[0]; });
		const yCoords = coords.map(function (point) { return point[1]; });

		const left = Math.min.apply(null, xCoords);
		const top = Math.min.apply(null, yCoords);
		const right = Math.max.apply(null, xCoords);
		const bottom = Math.max.apply(null, yCoords);

		const w = right - left;
		const h = bottom - top;

		if (w <= 0 || h <= 0) {
			const unique = [
				...new Map(coords.map(obj => [`${obj[0]}:${obj[1]}`, obj]))
					.values()
			];

			if (unique.length === 1) {
				return [left, top, 1, 1];
			}

			if (coords.length === 4) {

				const equal = function (p1: [number, number], p2: [number, number]) { if (p1[0] === p2[0] && p1[1] === p2[1]) { return true; } };

				const result = coords.slice(0);
				for (let i = 0; unique.length > i; i++) {
					const point = unique[i];
					let pointPos;

					if (equal(coords[0], coords[1])) {
						pointPos = i + 1;
					} else {
						pointPos = 3 - result.reverse().findIndex(x => x[0] === point[0] && x[1] === point[1]);
					}
					const cPoint: [number, number] = [
						result[pointPos][0] + (w === 0 ? 1 : 0),
						result[pointPos][1] + (h === 0 ? 1 : 0)
					];
					result[pointPos] = cPoint;
				}
				return [left, top, w || 1, h || 1];
			}
		}
		return [left, top, w, h];
	}

	/**
	 * Calculates transformation matrix for given points.
	 * @param uv UV coordinates
	 * @param xy XY coordinates
	 * @param useNearest If enabled, calculates transformation matrix subtracting this angle
	 * @returns List of values in format
	 * [Transformation Matrix , transformed points at start position for transform, nearest angle, boolean for mirroring]
	 */
	static estimate(uv: Points, xy: Points, useNearest: boolean = false): [Matrix, Points, number, boolean] {
		let rotation = 0;
		let mirroring = false;
		const matrix = new Matrix();

		if (useNearest) {
			[rotation, mirroring] = this.getNearest(uv, xy);
		}
		matrix.rotateX(rotation * (Math.PI / 180));

		if (mirroring) {
			matrix.scaleX(-1);
		}

		uv = matrix.transform(uv);

		let bitmapBox: Array<[number, number]> = [];

		for (let i = 0; uv.length > i; i++) {
			if (i === 0) {
				bitmapBox.push([0, 0]);
			} else {
				const xDistance = uv[i][0] - uv[i - 1][0];
				const yDistance = uv[i][1] - uv[i - 1][1];

				bitmapBox.push([
					bitmapBox[i - 1][0] + xDistance,
					bitmapBox[i - 1][1] + yDistance
				]);
			}

			if (bitmapBox[i][0] < 0) {
				bitmapBox = bitmapBox.map(function (point) { return [point[0] - bitmapBox[i][0], point[1]]; });
			}

			if (bitmapBox[i][1] < 0) {
				bitmapBox = bitmapBox.map(function (point) { return [point[0], point[1] - bitmapBox[i][1]]; });
			}
		}

		matrix.estimate(bitmapBox, xy);

		return [matrix, bitmapBox, rotation, mirroring];
	}

	/**
	 * Method that loads a DrawCommand tag from a buffer.
	 * @param tag ShapeDrawCommand tag
	 * @param swf SupercellSWF instance
	 * @retur {@link ShapeDrawCommand Draw command} current instance
	 */
	load(tag: number, swf: SupercellSWF): ShapeDrawCommand {
		this.textureIndex = swf.buffer.readUInt8();

		this.maxRects = tag === 4;

		let pointsCount = 4;
		if (!this.maxRects) {
			pointsCount = swf.buffer.readUInt8();
		}

		for (let xy = 0; xy < pointsCount; xy++) {
			this.xyCoords.push([
				swf.buffer.readTwip(),
				swf.buffer.readTwip()
			]);
		}
		for (let uv = 0; uv < pointsCount; uv++) {
			const w = swf.buffer.readUInt16LE();
			const h = swf.buffer.readUInt16LE();

			if (tag === 22) {
				this.normalized = true;
			}

			this.uvCoords.push([
				Math.ceil(w),
				Math.ceil(h)
			]);
		}

		return this;
	}

	/**
	 * Method that writes DrawCommand tag to buffer.
	 * @param buffer ScBuffer instance
	 * @return Current ShapeDrawCommand instance
	 */
	save(buffer: ScBuffer): ShapeDrawCommand {
		const tag = this.normalized ? (this.maxRects ? 4 : 22) : 17;
		const pointsCount = this.maxRects ? 4 : this.xyCoords.length;

		const tagBuffer = new ScBuffer();
		tagBuffer.writeUInt8(this.textureIndex);
		if (!this.maxRects) {
			tagBuffer.writeUInt8(this.xyCoords.length);
		}

		for (let xy = 0; pointsCount > xy; xy++) {
			const [x, y] = this.xyCoords[xy];
			tagBuffer.writeTwip(x);
			tagBuffer.writeTwip(y);
		}

		for (let uv = 0; pointsCount > uv; uv++) {
			const [u, v] = this.uvCoords[uv];
			tagBuffer.writeUInt16LE(u);
			tagBuffer.writeUInt16LE(v);
		}

		buffer.saveTag(tag, tagBuffer);

		return this;
	}

	/**
	 * Normalizes UV coordinates and turns them into values from 0 to 65535
	 * @param swf SupercellSWF instance
	 */
	normalize(swf: SupercellSWF): Points {
		if (!this.normalized) {
			this.uvCoords = this.uvCoords.map(point => {
				const [u, v]: [number, number] = point; return [
					u * 0xFFFF / swf.textures[this.textureIndex].image.width,
					v * 0xFFFF / swf.textures[this.textureIndex].image.height
				];
			});
			this.normalized = true;
		}
		return this.uvCoords;
	}

	/**
	 * Denormalizes UV coordinates and turns them into points on texture
	 * @param swf SupercellSWF object
	 */
	denormalize(swf: SupercellSWF): Points {
		if (this.normalized) {
			this.uvCoords = this.uvCoords.map(point => {
				const [u, v]: [number, number] = point; return [
					Math.ceil(u / 0xFFFF * swf.textures[this.textureIndex].image.width),
					Math.ceil(v / 0xFFFF * swf.textures[this.textureIndex].image.height)
				];
			});
			this.normalized = false;
		}
		return this.uvCoords;
	}

	/**
	 * @param swf SupercellSWF instance
	 * @param useNearest Whether to use nearest angle. Making better looking sprites.
	 * @returns Returns Image-js instance
	 */
	getImage(swf: SupercellSWF, useNearest = false): Image {
		if (this.normalized) {
			this.denormalize(swf);
		}

		const [x, y, width, height] = ShapeDrawCommand.getBoundingBox(this.uvCoords);

		const sheet = swf.textures[this.textureIndex].image;

		let sheetKind: string;
		switch (sheet.channels) {
			case 4:
				sheetKind = 'RGBA';
				break;
			case 3:
				sheetKind = 'RGB';
				break;
			case 2:
				sheetKind = 'GREYA';
				break;
			case 1:
				sheetKind = 'GREY';
				break;
			default:
				sheetKind = 'RGBA';
				break;
		}

		let sprite = new Image(width, height, { kind: sheetKind as ImageKind });

		function inside(pointX: number, pointY: number, poly: Array<[number, number]>) {
			let isInside = false;
			for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
				const xi = poly[i][0], yi = poly[i][1];
				const xj = poly[j][0], yj = poly[j][1];

				const intersect = ((yi > pointY) !== (yj > pointY))
					&& (pointX < (xj - xi) * (pointY - yi) / (yj - yi) + xi);
				if (intersect) { isInside = !isInside; }
			}

			return isInside;
		}

		for (let w = 0; width > w; w++) {
			for (let h = 0; height > h; h++) {
				const uvX = w + x;
				const uvY = h + y;

				if ((width <= 1 || height <= 1) || inside(uvX, uvY, this.uvCoords)) {
					sprite.setPixelXY(w, h, sheet.getPixelXY(uvX, uvY));
				} else {
					sprite.setPixelXY(w, h, new Array(sprite.channels).fill(0));
				}
			}
		}

		if (useNearest) {
			const [angle, mirror] = ShapeDrawCommand.getNearest(this.uvCoords, this.xyCoords);

			switch (angle) {
				case 270:
					sprite = sprite.rotateLeft();
					break;
				case 90:
					sprite = sprite.rotateRight();
					break;
				case 180:
					sprite.flipY();
					break;
				default:
					break;
			}
			if (mirror) {
				sprite.flipX();
			}
		}
		return sprite;
	}

	toJSON() {
		return {
			textureIndex: this.textureIndex,
			uvCoords: this.uvCoords,
			normalized: this.normalized,
			xyCoords: this.xyCoords,
			maxRects: this.maxRects
		};
	}

	fromJSON(data: any): ShapeDrawCommand {
		this.textureIndex = data.textureIndex === undefined ? 0 : data.textureIndex;
		this.uvCoords = data.uvCoords || [];
		this.normalized = data.normalized ? true : false;
		this.xyCoords = data.xyCoords || [];
		this.maxRects = data.maxRects ? true : false;
		return this;
	}

	/**
	 * Clones ShapeDrawCommand object.
	 * @returns Сloned ShapeDrawCommand
	 */
	clone(): ShapeDrawCommand {
		return new ShapeDrawCommand({
			textureIndex: this.textureIndex,
			xyCoords: Object.assign([], this.xyCoords),
			uvCoords: Object.assign([], this.uvCoords),
			maxRects: this.maxRects,
			normalized: this.normalized
		});
	}
}
