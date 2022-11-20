import { ScBuffer } from './buffer';
import { ClassConstructor } from './interfaces';
import { SupercellSWF } from './swf';

export class TextField {
	/**
	 * Name of font. Fonts are used from "fonts" folder or from system fonts
	 */
	fontName: string = undefined;

	/**
	 * RGBA font color
	 */
	fontColor = [0, 0, 0, 0];

	/**
	 * RGBA outline color
	 */
	outlineColor = [0, 0, 0, 0];

	/**
	 * Font size
	 */
	fontSize = 0;

	/**
	 * Something like text centering, still not clear
	 */
	fontAlign = 0;

	/**
	 * Use bold font type
	 */
	bold = false;

	/**
	 * Use italic font type
	 */
	italic = false;

	/**
	 * Enables ability to make many lines in TextField object
	 */
	multiline = false;

	/**
	 * Enables text stroke
	 */
	outline = false;

	/**
	 * Left corner position
	 */
	leftCorner = 0;

	/**
	 * Top corner position
	 */
	topCorner = 0;

	/**
	 * Right corner position
	 */
	rightCorner = 0;

	/**
	 * Bottom corner position
	 */
	bottomCorner = 0;

	/**
	 * Placeholer text
	 */
	text: string = undefined;

	flag1: boolean = undefined;
	flag2: boolean = undefined;
	flag3: boolean = undefined;

	c1: number = undefined;
	c2: number = undefined;

	constructor(options?: ClassConstructor<TextField>) {
		Object.assign(this, options);
	}

	/**
	 * Method that loads a TextField tag from a buffer.
	 * @param {number} tag TextField tag
	 * @param {SupercellSWF} swf SupercellSWF object
	 * @returns {TextField} Current TextField instance
	 */
	load(tag: number, swf: SupercellSWF): TextField {
		const id = swf.buffer.readUInt16LE();
		swf.resources[id] = this;

		this.fontName = swf.buffer.readASCII();
		this.fontColor = [
			swf.buffer.readUInt8(),
			swf.buffer.readUInt8(),
			swf.buffer.readUInt8(),
			swf.buffer.readUInt8()];

		this.bold = swf.buffer.readBoolean();
		this.italic = swf.buffer.readBoolean();
		this.multiline = swf.buffer.readBoolean();

		swf.buffer.skip(1);

		this.fontAlign = swf.buffer.readUInt8();
		this.fontSize = swf.buffer.readUInt8();

		this.topCorner = swf.buffer.readInt16LE();
		this.bottomCorner = swf.buffer.readInt16LE();
		this.leftCorner = swf.buffer.readInt16LE();
		this.rightCorner = swf.buffer.readInt16LE();

		this.outline = swf.buffer.readBoolean();
		this.text = swf.buffer.readASCII();

		if (tag === 7) { // Default textfield
			return;
		}

		this.flag1 = swf.buffer.readBoolean(); // tag 15

		if (tag > 15) { // tag 20
			this.flag2 = tag <= 25;
		}

		if (tag > 20) { // tag 21
			this.outlineColor = [
				swf.buffer.readUInt8(),
				swf.buffer.readUInt8(),
				swf.buffer.readUInt8(),
				swf.buffer.readUInt8()];
		}

		if (tag > 25) { // tag 33
			this.c1 = swf.buffer.readInt16LE();
			swf.buffer.skip(2);
		}

		if (tag > 33) { // tag 43
			this.c2 = swf.buffer.readInt16LE();
		}

		if (tag > 43) { // tag 44
			this.flag3 = swf.buffer.readBoolean();
		}

		return this;
	}

	fromJSON(data: any): TextField {
		this.fontName = undefined || data.fontName;
		this.fontColor = Object.assign([0, 0, 0, 0], data.fontColor ? data.fontColor : []);
		this.outlineColor = Object.assign([0, 0, 0, 0], data.outlineColor ? data.outlineColor : []);
		this.fontSize = data.fontSize === undefined ? 0 : data.fontSize;
		this.fontAlign = data.fontAlign === undefined ? 0 : data.fontAlign;
		this.bold = data.bold ? true : false;
		this.italic = data.italic ? true : false;
		this.multiline = data.multiline ? true : false;
		this.outline = data.outline ? true : false;
		this.leftCorner = data.leftCorner === undefined ? 0 : data.leftCorner;
		this.topCorner = data.topCorner === undefined ? 0 : data.topCorner;
		this.rightCorner = data.rightCorner === undefined ? 0 : data.rightCorner;
		this.bottomCorner = data.bottomCorner === undefined ? 0 : data.bottomCorner;
		this.text = data.text;
		this.flag1 = data.flag1;
		this.flag2 = data.flag2;
		this.flag3 = data.flag3;
		this.c1 = data.c1;
		this.c2 = data.c2;
		return this;
	}

	/**
	 * Method that writes TextField tag to buffer.
	 * @param id TextField ID
	 * @param swf SupercellSWF instance
	 */
	save(id: number, swf: SupercellSWF): void {
		let tag = 7;
		const tagBuffer = new ScBuffer();

		tagBuffer.writeUInt16LE(id);

		tagBuffer.writeASCII(this.fontName);

		tagBuffer.writeUInt8(this.fontColor[0]);
		tagBuffer.writeUInt8(this.fontColor[1]);
		tagBuffer.writeUInt8(this.fontColor[2]);
		tagBuffer.writeUInt8(this.fontColor[3]);

		tagBuffer.writeBoolean(this.bold);
		tagBuffer.writeBoolean(this.italic);
		tagBuffer.writeBoolean(this.multiline);

		tagBuffer.fill(1);

		tagBuffer.writeUInt8(this.fontAlign);
		tagBuffer.writeUInt8(this.fontSize);

		tagBuffer.writeInt16LE(this.topCorner);
		tagBuffer.writeInt16LE(this.bottomCorner);
		tagBuffer.writeInt16LE(this.leftCorner);
		tagBuffer.writeInt16LE(this.rightCorner);

		tagBuffer.writeBoolean(this.outline);
		tagBuffer.writeASCII(this.text);

		if (this.flag1 !== undefined) {
			tag = 15;
			tagBuffer.writeBoolean(this.flag1);

			if (this.flag2 !== undefined) {
				if (this.flag2) {
					tag = 20;
				} else {
					if (this.outlineColor !== undefined) {
						tag = 21;
						tagBuffer.writeUInt8(this.outlineColor[0]);
						tagBuffer.writeUInt8(this.outlineColor[1]);
						tagBuffer.writeUInt8(this.outlineColor[2]);
						tagBuffer.writeUInt8(this.outlineColor[3]);


						if (this.c1 !== undefined) {
							tag = 33;
							tagBuffer.writeInt16LE(this.c1);
							tagBuffer.fill(2);

							if (this.c2 !== undefined) {
								tag = 33;
								tagBuffer.writeInt16LE(this.c2);

								if (this.flag3 !== undefined && !this.flag2) {
									tag = 43;
									if (this.flag3) {
										tag = 44;
										tagBuffer.writeBoolean(this.flag3);
									}
								}
							}
						} else {
							tag = 25;
						}
					}
				}
			}
		}
		swf.buffer.saveTag(tag, tagBuffer);
	}

	clone(): TextField {
		return new TextField({
			fontName: this.fontName,
			fontColor: Object.assign([], this.fontColor),
			outlineColor: Object.assign([], this.outlineColor),
			fontSize: this.fontSize,
			fontAlign: this.fontAlign,
			bold: this.bold,
			italic: this.italic,
			multiline: this.multiline,
			outline: this.outline,
			leftCorner: this.leftCorner,
			rightCorner: this.rightCorner,
			topCorner: this.topCorner,
			bottomCorner: this.bottomCorner,
			text: this.text,
			flag1: this.flag1,
			flag2: this.flag2,
			flag3: this.flag3,
			c1: this.c1,
			c2: this.c2
		});
	}
}
