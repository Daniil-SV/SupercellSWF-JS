import { ClassConstructor, Points } from '../utils';
import { ScBuffer } from '../buffer';
import { SupercellSWF } from '../swf';

/**
 * An object that can change size, shape, and position of an object in a MovieClipFrame
 * @category Transformations
 */
export class Matrix {
	/**
	 * Scale X
	 */
	a = 1.0;

	/**
	 * Skew X
	 */
	b = 0.0;

	/**
	 * Skew Y
	 */
	c = 0.0;

	/**
	 * Scale Y
	 */
	d = 1.0;

	/**
	 * Translation X
	 */
	tx = 0.0;

	/**
	 * Translation Y
	 */
	ty = 0.0;

	/**
	 * When enabled, uses a smaller divisor so matrix becomes more accurate.
	 */
	detailed: boolean;

	constructor(options?: ClassConstructor<Matrix>) {
		Object.assign(this, options);
	}

	/**
	 * Method that loads a Matrix tag from a buffer.
	 * @param {number} tag Matrix tag
	 * @param {SupercellSWF} swf SupercellSWF instance
	 * @returns {Matrix} Current Matrix instance
	 */
	load(tag: number, swf: SupercellSWF): Matrix {
		let divider = 1024;

		if (tag === 36) {
			this.detailed = true;
			divider = 0xFFFF;
		}

		this.a = swf.buffer.readInt32() / divider;
		this.b = swf.buffer.readInt32() / divider;
		this.c = swf.buffer.readInt32() / divider;
		this.d = swf.buffer.readInt32() / divider;
		this.tx = swf.buffer.readTwip();
		this.ty = swf.buffer.readTwip();

		return this;
	}

	/**
	 * Method that writes Matrix tag to buffer
	 * @param {SupercellSWF} swf SupercellSWF instance
	 */
	save(swf: SupercellSWF): void {
		const tag = this.detailed ? 36 : 8;
		const tagBuffer = new ScBuffer();

		const multiplier = this.detailed ? 0xFFFF : 1024;

		tagBuffer.writeInt32(Math.round(this.a * multiplier));
		tagBuffer.writeInt32(Math.round(this.b * multiplier));
		tagBuffer.writeInt32(Math.round(this.c * multiplier));
		tagBuffer.writeInt32(Math.round(this.d * multiplier));

		tagBuffer.writeTwip(this.tx);
		tagBuffer.writeTwip(this.ty);

		swf.buffer.saveTag(tag, tagBuffer);
	}

	/**
	 * Needed to get rotation on X axis
	 * @returns {number} Rotation angle in radians
	 */
	getRotationX(): number {
		return Math.atan2(-this.b, this.a);
	}

	/**
	 * Clockwise rotates matrix by given angle
	 * @param {number} angle Angle in radians
	 * @returns {Matrix} Current matrix instance
	 */
	rotateX(angle: number): Matrix {
		if (angle + this.getRotationX() > Math.PI * 2) {
			angle = (angle + this.getRotationX()) - (Math.PI * 2);
		}

		this.a *= Math.cos(angle);
		this.b = -Math.sin(angle);
		this.c = Math.sin(angle);
		this.d *= Math.cos(angle);

		return this;
	}

	/**
	 * Needed to get rotation on Y axis
	 * @returns {number} Rotation angle in radians
	 */
	getRotationY(): number {
		return Math.atan2(this.c, this.d);
	}


	/**
	 * Counterclockwise rotates matrix by given angle
	 * @param {number} angle Angle in radians
	 * @returns {Matrix} Current matrix instance
	 */
	rotateY(angle: number): Matrix {
		if (angle + this.getRotationY() > Math.PI * 2) {
			angle = (angle + this.getRotationY()) - (Math.PI * 2);
		}

		this.a *= Math.cos(angle);
		this.b = Math.sin(angle);
		this.c = -Math.sin(angle);
		this.d *= Math.cos(angle);

		return this;
	}

	/**
	 * Needed to get scale factor on X-axis
	 * @returns {number} Scale factor on X-axis
	 */
	getScaleX(): number {
		return Math.sqrt(this.a * this.a + this.b * this.b);
	}

	/**
	 * Multiplies scale of matrix around X-axis by given value
	 * @param {number} value Scale factor
	 * @returns {Matrix} Current matrix instance
	 */
	scaleX(value: number): Matrix {
		this.a *= value;

		return this;
	}

	/**
	 * Needed to get scale factor on Y-axis
	 * @returns {number} Scale factor on Y-axis
	 */
	getScaleY(): number {
		return Math.sqrt(this.c * this.c + this.d * this.d);
	}

	/**
	 * Multiplies scale of matrix along Y-axis by given value
	 * @param {number} value Scale factor
	 * @returns {Matrix} Current matrix instance
	 */
	scaleY(value: number): Matrix {
		this.d *= value;

		return this;
	}

	/**
	 * Needed to get whole scale factor
	 * @returns {number} Overall scale factor
	 */
	getScale(): number {
		const sx = this.getScaleX();
		const sy = this.getScaleY();

		return Math.sqrt((sx * sx + sy * sy) * 0.5);
	}

	/**
	 * Multiplies matrix scale by scale factor
	 * @param value Scale factor
	 * @returns {Matrix} Current matrix instance
	 */
	scale(value: number): Matrix {
		this.scaleX(value);
		this.scaleY(value);

		return this;
	}

	/**
	 * Needed to get translation values
	 * @returns {[number, number]} Translation x, Translation y
	 */
	getTranslation(): [number, number] {
		return [this.tx, this.ty];
	}

	/**
	 * Finds transformation between two sets of points
	 * @param {Points} from Points from which transformation will be searched
	 * @param {Points} to Points for which transformation will be searched
	 * @returns {Matrix} Matrix with results
	 * @author taken from "affine6p": Masahiro Yoshimoto
	 */
	estimate(from: Points, to: Points): Matrix {
		const N = Math.min(from.length, to.length);

		const round = function (num: number, places: number) {
			const factor = 10 ** places;
			return Math.round(num * factor) / factor;
		};

		if (N >= 3) {
			let mat00, mat11, mat22, mat01, mat10, mat02, mat20, mat12, mat21;
			mat00 = mat11 = mat22 = mat01 = mat10 = mat02 = mat20 = mat12 = mat21 = 0.0;

			let vec0, vec1, vec2, vec3, vec4, vec5;
			vec0 = vec1 = vec2 = vec3 = vec4 = vec5 = 0.0;

			for (let i = 0; N > i; i++) {
				const ox = from[i][0];
				const oy = from[i][1];
				const cx = to[i][0];
				const cy = to[i][1];


				mat00 += ox * ox;
				mat01 += ox * oy;
				mat02 += ox;
				mat10 += ox * oy;
				mat11 += oy * oy;
				mat12 += oy;
				mat20 += ox;
				mat21 += oy;
				mat22 += 1;

				vec0 += ox * cx;
				vec1 += oy * cx;
				vec2 += cx;
				vec3 += ox * cy;
				vec4 += oy * cy;
				vec5 += cy;
			}

			// Determinant of mat
			let det = 0.0;
			det += mat00 * mat11 * mat22 + mat10 * mat21 * mat02 + mat20 * mat01 * mat12;
			det -= mat00 * mat21 * mat12 + mat20 * mat11 * mat02 + mat10 * mat01 * mat22;

			if (Math.abs(det) < 1e-8) {
				console.error('Value of determinant is almost zero.');
				return this;
			}

			const inv_det = 1.0 / det;

			const inv_mat00 = inv_det * (mat11 * mat22 - mat12 * mat21);
			const inv_mat01 = inv_det * (mat12 * mat20 - mat10 * mat22);
			const inv_mat02 = inv_det * (mat10 * mat21 - mat11 * mat20);
			const inv_mat10 = inv_mat01;
			const inv_mat11 = inv_det * (mat22 * mat00 - mat20 * mat02);
			const inv_mat12 = inv_det * (mat20 * mat01 - mat21 * mat00);
			const inv_mat20 = inv_mat02;
			const inv_mat21 = inv_mat12;
			const inv_mat22 = inv_det * (mat00 * mat11 - mat01 * mat10);

			// Estimators
			this.a = round(inv_mat00 * vec0 + inv_mat01 * vec1 + inv_mat02 * vec2, 4);
			this.b = round(inv_mat10 * vec0 + inv_mat11 * vec1 + inv_mat12 * vec2, 4);
			this.c = round(inv_mat00 * vec3 + inv_mat01 * vec4 + inv_mat02 * vec5, 4);
			this.d = round(inv_mat10 * vec3 + inv_mat11 * vec4 + inv_mat12 * vec5, 4);
			this.tx = round(inv_mat20 * vec0 + inv_mat21 * vec1 + inv_mat22 * vec2, 4);
			this.ty = round(inv_mat20 * vec3 + inv_mat21 * vec4 + inv_mat22 * vec5, 4);

		} else if (N === 2) {
			let x0, x1, y0, y1, x02, y02, x0x1, y0y1, y0x1, x0y1;
			x0 = x1 = y0 = y1 = x02 = y02 = x0x1 = y0y1 = y0x1 = x0y1 = 0.0;

			for (let i = 0; N > i; i++) {
				const ox = from[i][0];
				const oy = from[i][1];
				const cx = to[i][0];
				const cy = to[i][1];

				x0 += ox;
				y0 += oy;
				x1 += cx;
				y1 += cy;

				x02 += ox * ox;
				y02 += oy * oy;
				x0x1 += ox * cx;
				x0y1 += ox * cy;
				y0x1 += oy * cx;
				y0y1 += oy * cy;
			}

			const det = x0 * x0 + y0 * y0 - N * (x02 + y02);

			if (Math.abs(det) < 1e-8) {
				console.error('Value of determinant is almost zero.');
				return this;
			}

			const inv_det = 1.0 / det;

			// Estimators
			this.a = round((x0 * x1 + y0 * y1 - N * (x0x1 + y0y1)) * inv_det, 4);
			this.b = round((y0 * x1 - x0 * y1 - N * (y0x1 - x0y1)) * inv_det, 4);
			this.c = -this.b;
			this.d = this.a;
			this.tx = round((x1 - this.a * x0 - this.b * y0) / N, 4);
			this.ty = round((y1 - this.a * y0 + this.b * x0) / N, 4);
		}

		return this;
	}

	/**
	 * Transforms a set of points using current matrix
	 * @param {Points} points Points to be transformed
	 * @returns {Points} Transformed points
	 */
	transform(points: Array<[number, number]>): Points {
		const result: Array<[number, number]> = [];
		for (let i = 0; points.length > i; i++) {
			const point = points[i];

			result.push([
				Math.round(point[0] * this.a + this.b * point[1] + this.tx),
				Math.round(this.c * point[0] + this.d * point[1] + this.ty)
			]);
		}

		return result;
	}

	/**
	 * Clones a matrix
	 * @returns {Matrix} Matrix clone
	 */
	clone(): Matrix {
		return new Matrix(this);
	}

	toJSON() {
		return [this.a, this.b, this.c, this.d, this.tx, this.ty];
	}

	fromJSON(data: any): Matrix {
		this.a = data[0] === undefined ? 1 : data[0];
		this.b = data[1] === undefined ? 0 : data[1];
		this.c = data[2] === undefined ? 0 : data[2];
		this.d = data[3] === undefined ? 1 : data[3];
		this.tx = data[4] === undefined ? 0 : data[4];
		this.ty = data[5] === undefined ? 0 : data[5];
		return this;
	}
}
