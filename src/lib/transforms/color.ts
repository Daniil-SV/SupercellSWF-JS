import { ClassConstructor } from '../interfaces';
import { ScBuffer } from '../buffer';
import { SupercellSWF } from '../swf';

/**
 * An object that is used to transform the object's color properties in  MovieClipFrame
 * @category Transformations
 */
export class Color {
	/**
	 * Alpha addition
	 */
	A_add = 0.0;

	/**
	 * Red addition
	 */
	R_add = 0.0;

	/**
	 * Green addition
	 */
	G_add = 0.0;

	/**
	 * Blue addition
	 */
	B_add = 0.0;

	/**
	 * Alpha multiply
	 */
	A_mul = 1.0;

	/**
	 * Red multiply
	 */
	R_mul = 1.0;

	/**
	 * Green multiply
	 */
	G_mul = 1.0;

	/**
	 * Blue multiply
	 */
	B_mul = 1.0;

	/**
	 * @param {IColor} options Initial values
	 */
	constructor(options?: ClassConstructor<Color>) {
		Object.assign(this, options);
	}

	/**
	 * Method that loads a Color transform tag from a buffer.
	 * @param {SupercellSWF} swf SupercellSWF object
	 * @returns {Color} Current Color instance
	 */
	load(tag: number, swf: SupercellSWF): Color {
		this.R_add = swf.buffer.readUInt8();
		this.G_add = swf.buffer.readUInt8();
		this.B_add = swf.buffer.readUInt8();

		this.A_mul = swf.buffer.readUInt8() / 255;
		this.R_mul = swf.buffer.readUInt8() / 255;
		this.G_mul = swf.buffer.readUInt8() / 255;
		this.B_mul = swf.buffer.readUInt8() / 255;

		return this;
	}

	/**
	 * Method that writes Color transform tag to buffer.
	 * @param {SupercellSWF} swf SupercellSWF instance
	 */
	save(swf: SupercellSWF) {
		// TODO: improve it
		const tag = 9;
		const tagBuffer = new ScBuffer();

		tagBuffer.writeUInt8(this.R_add);
		tagBuffer.writeUInt8(this.G_add);
		tagBuffer.writeUInt8(this.B_add);

		const A_mul = Math.abs(this.A_mul + this.A_add);
		tagBuffer.writeUInt8(Math.round((A_mul > 1 ? 1 : A_mul) * 255));
		tagBuffer.writeUInt8(Math.round(this.R_mul * 255));
		tagBuffer.writeUInt8(Math.round(this.G_mul * 255));
		tagBuffer.writeUInt8(Math.round(this.B_mul * 255));

		swf.buffer.saveTag(tag, tagBuffer);
	}

	toJSON() {
		return {
			'Add': [
				this.A_add,
				this.B_add,
				this.G_add,
				this.R_add
			], 'Mul': [
				this.A_mul,
				this.B_mul,
				this.G_mul,
				this.R_mul
			]
		};
	}

	fromJSON(data: any): Color {
		const addData = data.Add;
		const mulData = data.Mul;

		if (addData) {
			this.A_add = addData[0] === undefined ? 0 : addData[0];
			this.B_add = addData[1] === undefined ? 0 : addData[1];
			this.G_add = addData[2] === undefined ? 0 : addData[2];
			this.R_add = addData[3] === undefined ? 0 : addData[3];
		}

		if (mulData) {
			this.A_mul = mulData[0] === undefined ? 1 : mulData[0];
			this.B_mul = mulData[1] === undefined ? 1 : mulData[1];
			this.G_mul = mulData[2] === undefined ? 1 : mulData[2];
			this.R_mul = mulData[3] === undefined ? 1 : mulData[3];
		}
		return this;
	}

	/**
	 * Clones Color object.
	 * @returns Сloned Color
	 */
	clone(): Color {
		return new Color(this);
	}
}
