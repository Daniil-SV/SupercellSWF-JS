import { ClassConstructor } from '../interfaces';
import { SupercellSWF } from '../swf';

import { Matrix } from './matrix';
import { Color } from './color';

import _ = require('lodash');
import { ScBuffer } from '../buffer';
import { MovieClip } from '../movie_clip/movie_clip';

/**
 * An object that contains all the transformations for the movie clips.
 * It is used because maximum number of transformations (uint16 - 65535) is sometimes not enough.
 * @category Transformations
 */
export class TransformBank {
	/**
	 * Array with matrices that bank has
	 */
	matrices: Matrix[] = [];

	/**
	 * Array with color transforms that bank has
	 */
	colors: Color[] = [];

	constructor(options?: ClassConstructor<TransformBank>) {
		Object.assign(this, options);
	}

	/**
	 * Method that loads a Bank tag from a buffer.
	 * @param swf SupercellSWF object
	 * @returns Current TransformBank instance
	 */
	load(swf: SupercellSWF): TransformBank {
		const matricesCount = swf.buffer.readUInt16LE();
		const colorsCount = swf.buffer.readUInt16LE();

		this.matrices = Array.apply(null, Array(matricesCount)).map(function () { return new Matrix(); });
		this.colors = Array.apply(null, Array(colorsCount)).map(function () { return new Color(); });

		swf.banks.push(this);

		return this;
	}

	/**
	 * Method that writes Bank tag to buffer.
	 * @param swf SupercellSWF instance
	 * @param asTag Indicates whether bank should be written as a tag
	 */
	save(swf: SupercellSWF, asTag: boolean = false): void {
		const tag = 42;
		const tagBuffer = new ScBuffer();

		tagBuffer.writeUInt16LE(this.matrices.length);
		tagBuffer.writeUInt16LE(this.colors.length);

		if (asTag) {
			swf.buffer.saveTag(tag, tagBuffer);
		} else {
			swf.buffer.writeBuffer(tagBuffer.toBuffer());
		}
	}

	/**
	 * Adds a matrix to bank and returns its index in matrix array
	 * @param matrix Matrix instance
	 * @returns Matrix index. Returns undefined if matrix cannot be placed here
	 */
	addMatrix(matrix: Matrix | undefined): number | undefined {
		if (!matrix) {
			return undefined;
		}

		const matrixIndex = _.findIndex(this.matrices, matrix);
		if (matrixIndex >= 0) {
			return matrixIndex;
		} else if (this.matrices.length < 0XFFFF) {
			this.matrices.push(matrix);
			return this.matrices.length - 1;
		} else {
			return undefined;
		}
	}

	/**
	 * Adds a color transform to bank and returns its index in color array
	 * @param color Color instance
	 * @returns Color index. Returns undefined if color cannot be placed here
	 */
	addColor(color: Color | undefined): number | undefined {
		if (!color) {
			return undefined;
		}

		const colorIndex = _.findIndex(this.colors, color);
		if (colorIndex >= 0) {
			return colorIndex;
		} else if (this.colors.length < 0XFFFF) {
			this.colors.push(color);
			return this.colors.length - 1;
		} else {
			return undefined;
		}
	}

	/**
	 * Determines whether a list of transformations can fit into a bank.
	 * @param matrices Matrices array
	 * @param colors Colors array
	 * @returns
	 */
	canStoreTransforms(matrices: Matrix[] = [], colors: Color[] = []): boolean {
		if (matrices.length > 0xFFFF || colors.length > 0xFFFF) {
			throw new Error(`Wrong number of transformations! ${matrices.length > 0xFFFF ? `Matrices has ${matrices.length}` : `Colors has ${colors.length}`} objects, but should be no more than 65535`);
		}

		const filtredMatrices = [];
		const filtredColors = [];

		let matricesOffset = 0;
		for (const matrix of matrices) {
			if (_.findIndex(this.matrices, matrix) > 0 || _.findIndex(filtredMatrices, matrix) >= 0) {
				matricesOffset++;
			} else {
				filtredMatrices.push(matrix);
			}
		}

		let colorsOffset = 0;
		for (const color of colors) {
			if (_.findIndex(this.colors, color) > 0 && _.findIndex(filtredMatrices, color) >= 0) {
				colorsOffset++;
			} else {
				filtredColors.push(color);
			}
		}
		if (this.matrices.length + (matrices.length - matricesOffset) < 65535) {
			if (this.colors.length + (colors.length - colorsOffset) < 65535) {
				return true;
			}
		}

		return false;
	}

	cleanup(swf: SupercellSWF): TransformBank {
		const matrices = [];
		const colors = [];

		for (const id of Object.keys(swf.resources)) {
			const instance = swf.resources[id];

			if (instance instanceof MovieClip) {
				if (swf.banks.indexOf(this) === instance.bankIndex) {
					for (const frame of instance.frames) {
						for (const element of frame.elements) {
							let matrixIndex: number;
							if (element.matrix instanceof Matrix) {
								matrixIndex = _.findIndex(matrices, element.matrix);
								if (matrixIndex < 1) {
									matrices.push(element.matrix);
									matrixIndex = matrices.length - 1;
								}

							} else if (typeof element.matrix === 'number') {
								matrixIndex = _.findIndex(matrices, this.matrices[element.matrix]);
								if (matrixIndex < 0) {
									matrices.push(this.matrices[element.matrix]);
									matrixIndex = matrices.length - 1;
								}
							}

							element.matrix = matrixIndex;

							let colorIndex: number;
							if (element.color instanceof Color) {
								colorIndex = _.findIndex(this.colors, element.color);
								if (colorIndex < 0) {
									colors.push(element.color);
									colorIndex = colors.length - 1;
								}

							} else if (typeof element.color === 'number') {
								colorIndex = _.findIndex(colors, this.colors[element.color]);
								if (colorIndex < 0) {
									colors.push(this.colors[element.color]);
									colorIndex = colors.length - 1;
								}
							}
							element.color = colorIndex;
						}
					}
				}
			}
		}

		this.matrices = matrices;
		this.colors = colors;

		return this;
	}

	fromJSON(data: any): TransformBank {
		this.matrices = [];
		this.colors = [];

		if (data.matrices) {
			for (const matrix of data.matrices) {
				this.matrices.push(new Matrix().fromJSON(matrix));
			}
		}

		if (data.colors) {
			for (const color of data.colors) {
				this.colors.push(new Color().fromJSON(color));
			}
		}
		return this;
	}

	/**
	 * Clones Bank object.
	 * @returns Сloned Bank
	 */
	clone(): TransformBank {
		return new TransformBank({
			matrices: this.matrices.map(matrix => {
				return matrix.clone();
			}),
			colors: this.colors.map(color => {
				return color.clone();
			})
		});
	}
}
