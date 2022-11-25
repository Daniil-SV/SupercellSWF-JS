import * as fs from 'fs';
import { COMPRESSION, ScBuffer } from './buffer';
import { TransformBank } from './transforms/bank';
import { Exports } from './exports';
import { Texture } from './texture/texture';
import { Shape } from './shape/shape';
import { MovieClip } from './movie_clip/movie_clip';
import { TextField } from './textfield';
import { MovieClipModifier } from './movie_clip/modifier';
import { ClassConstructor, State } from './interfaces';

/** Contains all states that SupercellSWF instance sends during some event.
 * @enum
 */
export enum STATES {
	/** Indicates when loading of a file starts. Contains only path to file being loaded. */
	loading,
	/** Indicates when file is fully loaded. Contains path to loaded file. */
	loadingFinish,
	/** Indicates when file starts to save. Contains path to file being saved. */
	saving,
	/** Indicates when file is fully saved. Contains path to saved file. */
	savingFinish,
	/** Shows progress of resources loading. Has a download percentage in region from 0 to 100. */
	resources_load,
	/** Shows progress of resources saving. Has a save percentage in region from 0 to 100 */
	resources_save,
	/** Shows progress of texture loading.
	 *  Has an array that contains loading percentage (from 0 to 100)
	 *  and index of texture currently being loaded (maybe -1 if number of textures is not known). */
	texture_load,
	/** Shows progress of texture saving.
	 *  Has an array that contains saving percentage (from 0 to 100)
	 *  and index of texture currently being saved */
	texture_save,
	/** Indicates when an unknown tag was found. Quite a rare occurrence. */
	unknown_tag
}

/** The main class that allows you to read and write .sc files
 * @category Main
 * @example let swf = new SupercellSWF();
 * swf.load(FilePath);
 * swf.save(FilePath);
 */
export class SupercellSWF {
	/**
	 * Specifies which compression method the file will use. Please note that there is no compression by default, and the file may crash.
	*/
	compression: COMPRESSION = COMPRESSION.NONE;

	/**
	 * When enabled, uses second file for textures, otherwise writes everything to one file.
	 */
	hasExternalTexture = false;

	/**
	 * When this and hasExternalTexture variable is enabled creates a new file that contains low quality textures.
	*/
	hasLowresTexture = false;

	/** When this and hasExternalTexture variable is enabled,
	 *  creates a texture file with highresPostfix and a lowres file with lowresPostfix, regardless of whether hasLowresTexture is enabled.
	 */
	useUncommonTexture = false;

	/**
	 * Storage of export names for movie clips
	 */
	exports = new Exports();

	/**
	 * Array of textures (or spritesheets)
	 */
	textures: Texture[] = [];

	/**
	 * Postfix for uncammon texture
	 */
	highresPostfix = '_highres';

	/**
	 * Postfix for uncammon lowres texture
	 */
	lowresPostfix = '_lowres';

	/**
	 * List with transformation banks whose index is used in movie clips
	 */
	banks: TransformBank[] = [];

	/**
	 * Dictionary with all resources that have id
	 */
	resources = {};

	/**
	 * A variable that is needed to read and write sc by different classes and methods
	 */
	buffer = new ScBuffer();

	private _shapeCount = 0;
	private _movieClipsCount = 0;
	private _textFieldsCount = 0;
	private _modifiersCount = 0;

	constructor(options?: ClassConstructor<SupercellSWF>) {
		Object.assign(this, options);
	}

	/**
	 * A function to notify about module actions.
	 * Useful for custom message processing.
	 * @param state State or type of message that module sends
	 * @param property Message properties. Usually stores a percentage of progress.
	 */
	progress: State = function (state, property): void {
		switch (state) {
			case STATES.resources_load:
				process.stdout.write(`Resources loading: ${property}% \r`);
				break;
			case STATES.resources_save:
				process.stdout.write(`Resources writing: ${property}% \r`);
				break;
			case STATES.texture_load:
				// for cases when only textures are loaded, and we do not know the number of textures
				if (property[1] + 1 !== this.textures.length) {
					process.stdout.write(`Loading ${property[1] + 1}/${this.textures.length} textures: ${property[0]}% \r`);
				} else {
					process.stdout.write(`Texture ${this.textures.length} loading: ${property[0]}% \r`);
				}
				break;
			case STATES.texture_save:
				process.stdout.write(`Saving ${property[1] + 1}/${this.textures.length} textures: ${property[0]}% \r`);
				break;
			case STATES.loading:
				console.log(`Loading file: ${property}`);
				break;
			case STATES.loadingFinish:
				console.log(`Loading ${property} completed.`);
				break;
			case STATES.saving:
				console.log(`Writing file: ${property}`);
				break;
			case STATES.savingFinish:
				console.log(`Saving ${property} comleted.`);
				break;
			case STATES.unknown_tag:
				console.log(`Unknown tag ${property}!`);
				break;
		}
	};

	/**
	 * Loads content of .sc file with texture
	 * @param path Path to .sc file
	 */
	load(path: string): SupercellSWF {
		this.loadAsset(path);

		if (this.hasExternalTexture) {
			let texturePath: string;

			const commonPath = path.split('.').slice(0, -1).join('.') + '_tex.sc';
			const lowresPath = path.split('.').slice(0, -1).join('.') + `${this.lowresPostfix}_tex.sc`;
			const highresPath = path.split('.').slice(0, -1).join('.') + `${this.highresPostfix}_tex.sc`;

			if (this.useUncommonTexture) {
				if (fs.existsSync(highresPath)) {
					texturePath = highresPath;
				} else if (fs.existsSync(lowresPath)) {
					texturePath = lowresPath;
				}
			} else if (fs.existsSync(commonPath)) {
				texturePath = commonPath;
			} else if (this.hasLowresTexture && fs.existsSync(lowresPath)) {
				texturePath = lowresPath;
			}

			if (texturePath === undefined) {
				throw new Error('Texture file not exist!');
			}

			this.loadExternalTexture(texturePath);
		}
		return this;
	}

	/**
	 * Loads content of .sc file only, for example, if you need to edit something only in .sc file.
	 * @param path Path to .sc file
	 * @returns Current SupercellSWF instance
	 */
	loadAsset(path: string): SupercellSWF {
		this.progress(STATES.loading, path);

		const [buffer, compression] = ScBuffer.fromSc(path);
		this.buffer = buffer;
		this.compression = compression;

		// Header reading
		this._shapeCount = this.buffer.readUInt16LE();
		this._movieClipsCount = this.buffer.readUInt16LE();
		this.textures = Array.apply(null, Array(this.buffer.readUInt16LE())).map(function () { return new Texture(); });
		this._textFieldsCount = this.buffer.readUInt16LE();

		const firstBank: TransformBank = new TransformBank();
		firstBank.load(this);

		this.buffer.skip(5);

		this.exports.load(this);

		// Tags
		this.parseTags();

		this.progress(STATES.loadingFinish, path);
		return this;
	}

	/**
	 * Loads content of _tex.sс file only, for example, for some kind of texture processing
	 * @param path Path to _tex.sc file
	 * @returns Current SupercellSWF instance
	 */
	loadExternalTexture(path: string): SupercellSWF {
		this.progress(STATES.loading, path);

		this.buffer.destroy();
		this.buffer = ScBuffer.fromSc(path)[0];
		this.parseTags();
		this.buffer.destroy();

		this.progress(STATES.loadingFinish, path);

		return this;
	}

	/**
	 * Saves all instance data to a .sc file
	 * @param path Path to .sc file
	 */
	save(path: string): void {
		this.saveAsset(path);

		if (this.hasExternalTexture) {
			let externalPath = path.split('.').slice(0, -1).join('.') + '_tex.sc';

			if (this.useUncommonTexture) {
				externalPath = path.split('.').slice(0, -1).join('.') + `${this.highresPostfix}_tex.sc`;
			}

			this.saveExternalTexture(externalPath, false);

			if (this.hasLowresTexture || this.useUncommonTexture) {
				const lowresPath = path.split('.').slice(0, -1).join('.') + `${this.lowresPostfix}_tex.sc`;
				this.saveExternalTexture(lowresPath, true);
			}
		}
	}

	/**
	 * Saves instance content only, no external texture if enabled
	 * @param path Path to .sc file
	 */
	saveAsset(path: string): void {
		const movieClipModifierIds: number[] = [];
		const shapeIds: number[] = [];
		const textFieldIds: number[] = [];
		const movieClipIds: number[] = [];

		for (const [key, instance] of Object.entries(this.resources)) {
			if (instance instanceof MovieClipModifier) {
				movieClipModifierIds.push(parseInt(key, 10));
			} else if (instance instanceof Shape) {
				shapeIds.push(parseInt(key, 10));
			} else if (instance instanceof TextField) {
				textFieldIds.push(parseInt(key, 10));
			} else if (instance instanceof MovieClip) {
				movieClipIds.push(parseInt(key, 10));
			}
		}

		let resourceWritten = 0;
		const resourcesCount = movieClipModifierIds.length + shapeIds.length + textFieldIds.length + movieClipIds.length + this.banks.length;
		const getPercent = function () {
			return parseFloat((resourceWritten / resourcesCount * 100).toFixed(1));
		};

		this.buffer = new ScBuffer();

		this.buffer.writeUInt16LE(shapeIds.length);
		this.buffer.writeUInt16LE(movieClipIds.length);
		this.buffer.writeUInt16LE(this.textures.length);
		this.buffer.writeUInt16LE(textFieldIds.length);

		const bank = this.banks.length > 0 ? this.banks[0] : new TransformBank();
		bank.save(this);

		this.buffer.fill(5);

		this.exports.save(this);

		if (this.useUncommonTexture && this.highresPostfix !== '_highres' && this.lowresPostfix !== '_lowres') {
			const postfixTag = 32;
			const postfixBuffer = new ScBuffer();

			postfixBuffer.writeASCII(this.highresPostfix);
			postfixBuffer.writeASCII(this.lowresPostfix);

			this.buffer.saveTag(postfixTag, postfixBuffer);
		}

		if (this.hasLowresTexture) {
			this.buffer.saveTag(23);
		}

		if (this.useUncommonTexture) {
			this.buffer.saveTag(30);
		}

		if (this.hasExternalTexture) {
			this.buffer.saveTag(26);
		}

		for (const texture of this.textures) {
			texture.save(this, !this.hasExternalTexture, false);
		}

		if (movieClipModifierIds.length > 0) {
			const lengthTag = new ScBuffer();
			lengthTag.writeUInt16LE(movieClipModifierIds.length);
			this.buffer.saveTag(37, lengthTag);
			resourceWritten++;
			this.progress(STATES.resources_save, getPercent());
		}

		for (const modifierId of movieClipModifierIds) {
			this.resources[modifierId].save(modifierId, this);
			resourceWritten++;
			this.progress(STATES.resources_save, getPercent());
		}

		for (const shapeId of shapeIds) {
			this.resources[shapeId].save(shapeId, this);
			resourceWritten++;
			this.progress(STATES.resources_save, getPercent());
		}

		for (const textFieldId of textFieldIds) {
			this.resources[textFieldId].save(textFieldId, this);
			resourceWritten++;
			this.progress(STATES.resources_save, getPercent());
		}

		for (let bankIndex = 0; this.banks.length > bankIndex; bankIndex++) {
			// tslint:disable-next-line: no-shadowed-variable
			const bank = this.banks[bankIndex];
			if (bankIndex > 0) {
				bank.save(this, true);
			}

			for (const matrix of bank.matrices) {
				matrix.save(this);
			}

			for (const color of bank.colors) {
				color.save(this);
			}

			resourceWritten++;
			this.progress(STATES.resources_save, getPercent());
		}

		for (const movieClipId of movieClipIds) {
			this.resources[movieClipId].save(movieClipId, this);
			resourceWritten++;
			this.progress(STATES.resources_save, getPercent());
		}

		this.buffer.saveTag(0);

		this.progress(STATES.saving, path);
		ScBuffer.toSc(path, this.buffer, this.compression);
		this.buffer.destroy();
		this.progress(STATES.savingFinish, path);
	}

	/**
	 * Saves all textures to an external _tex.sc file
	 * @param path Path to _tex.sc file
	 * @param isLowres Writes low resolution textures
	 */
	saveExternalTexture(path: string, isLowres: boolean): void {
		this.buffer = new ScBuffer();

		for (const texture of this.textures) {
			texture.save(this, true, isLowres);
		}
		this.buffer.saveTag(0);

		this.progress(STATES.saving, path);
		ScBuffer.toSc(path, this.buffer, this.compression);
		this.buffer.destroy();
		this.progress(STATES.savingFinish, path);
	}

	toJSON(transformsToInstance = false) {
		const json = {
			compression: COMPRESSION[this.compression],
			hasExternalTexture: this.hasExternalTexture,
			hasLowresTexture: this.hasLowresTexture,
			useUncommonTexture: this.useUncommonTexture,
			highresPostfix: this.highresPostfix,
			lowresPostfix: this.lowresPostfix,
			textures: this.textures,
			modifiers: {},
			shapes: {},
			textFields: {},
			movieClips: {}
		};

		if (!transformsToInstance) {
			json['banks'] = this.banks;
		}

		for (const id of Object.keys(this.resources)) {
			let instance = this.resources[id];

			switch (instance.constructor) {
				case MovieClipModifier:
					json.modifiers[id] = instance;
					break;
				case Shape:
					json.shapes[id] = instance;
					break;
				case TextField:
					json.textFields[id] = instance;
					break;
				case MovieClip:
					if (transformsToInstance) {
						instance = instance.clone().toTransforms(this);
					}
					const exports = this.exports.getExportsById(parseInt(id, 10));
					if (exports) {
						instance = Object.assign({ exports: exports }, instance);
					}
					json.movieClips[id] = instance;
					break;
			}
		}

		return json;
	}

	fromJSON(data: any) {
		this.compression = COMPRESSION.NONE || COMPRESSION[data.compression as keyof typeof COMPRESSION];
		this.hasExternalTexture = false || data.hasExternalTexture;
		this.hasLowresTexture = false || data.hasLowresTexture;
		this.useUncommonTexture = false || data.useUncommonTexture;
		if (data.highresPostfix) {
			this.highresPostfix = data.highresPostfix;
		}
		if (data.lowresPostfix) {
			this.lowresPostfix = data.lowresPostfix;
		}

		this.textures = [];
		if (Array.isArray(data.textures)) {
			for (const texture of data.textures) {
				this.textures.push(new Texture().fromJSON(texture));
			}
		}

		this.resources = {};
		if (typeof data.modifiers === 'object') {
			for (const id of Object.keys(data.modifiers)) {
				this.resources[id] = new MovieClipModifier().fromJSON(data.modifiers[id]);
			}
		}

		if (typeof data.shapes === 'object') {
			for (const id of Object.keys(data.shapes)) {
				this.resources[id] = new Shape().fromJSON(data.shapes[id]);
			}
		}

		if (typeof data.textFields === 'object') {
			for (const id of Object.keys(data.textFields)) {
				this.resources[id] = new TextField().fromJSON(data.textFields[id]);
			}
		}

		if (typeof data.movieClips === 'object') {
			for (const id of Object.keys(data.movieClips)) {
				const movieclip = data.movieClips[id];
				if (movieclip.exports !== undefined) {
					for (const exportName of movieclip.exports) {
						this.exports.addExport(parseInt(id, 10), exportName);
					}
				}
				this.resources[id] = new MovieClip().fromJSON(movieclip);
			}
		}

		if (data.banks !== undefined) {
			this.banks = [];
			for (const bank of data.banks) {
				this.banks.push(new TransformBank().fromJSON(bank));
			}
		}

	}

	/**
	 * Clones a SupercellSWF object
	 * @returns {Matrix} SupercellSWF clone
	 */
	clone(): SupercellSWF {
		const clonedResources = {};
		for (const id of Object.keys(this.resources)) {
			const resource = this.resources[id];
			clonedResources[id] = resource.clone();
		}

		return new SupercellSWF({
			compression: this.compression,
			hasExternalTexture: this.hasExternalTexture,
			useUncommonTexture: this.useUncommonTexture,
			exports: this.exports.clone(),
			textures: this.textures.map(texture => {
				return texture.clone();
			}),
			highresPostfix: this.highresPostfix,
			lowresPostfix: this.lowresPostfix,
			banks: this.banks.map(bank => {
				return bank.clone();
			}),
			resources: clonedResources
		});
	}

	private parseTags(): void {
		let hasTextureData = true;

		let shapesLoaded = 0;
		let movieclipsLoaded = 0;
		let textfieldsLoaded = 0;
		let modifiersLoaded = 0;

		let banksLoaded = 0;
		let matricesLoaded = 0;
		let colorsLoaded = 0;

		let texturesLoaded = 0;

		const resourcesCount = this._shapeCount + this._movieClipsCount + this._textFieldsCount + this._modifiersCount;

		const getPercent = function () {
			return parseFloat(((shapesLoaded + movieclipsLoaded + textfieldsLoaded + modifiersLoaded) / resourcesCount * 100).toFixed(1));
		};

		let read = true;
		while (read) {
			const tag: number = this.buffer.readUInt8();
			const tagLength: number = this.buffer.readInt32LE();

			switch (tag) {
				case 0:
					read = false;
					break;

				case 1:
				case 16:
				case 19:
				case 24:
				case 27:
				case 28:
				case 29:
				case 34: // Texture
					if (this.textures[texturesLoaded]) {
						this.textures[texturesLoaded].load(tag, this, hasTextureData);
					} else {
						const texture = new Texture().load(tag, this, hasTextureData);
					}

					texturesLoaded++;
					break;

				case 23:
					this.hasLowresTexture = true;
					break;

				case 26:
					this.hasExternalTexture = true;
					hasTextureData = false;
					break;

				case 30:
					this.useUncommonTexture = true;
					break;

				case 32: // Texture postfix
					const highresPostfix = this.buffer.readASCII();
					const lowresPostfix = this.buffer.readASCII();
					if (highresPostfix && lowresPostfix) {
						this.highresPostfix = highresPostfix;
						this.lowresPostfix = lowresPostfix;
					}
					break;

				case 2:
				case 18: // Shape
					if (shapesLoaded >= this._shapeCount) {
						throw new Error('Trying to load too many Shapes! Aborting...');
					}

					new Shape().load(tag, this);
					shapesLoaded++;
					this.progress(STATES.resources_load, getPercent());
					break;

				case 3:
				case 10:
				case 12:
				case 14:
				case 35: // Movieclip
					if (movieclipsLoaded >= this._movieClipsCount) {
						throw Error('Trying to load too many MovieClips! Aborting...');
					}

					new MovieClip().load(tag, this);
					movieclipsLoaded++;
					this.progress(STATES.resources_load, getPercent());
					break;

				case 7:
				case 15:
				case 20:
				case 21:
				case 25:
				case 33:
				case 43:
				case 44: // Textfield
					if (textfieldsLoaded >= this._textFieldsCount) {
						throw new Error(('Trying to load too many Textfields! Aborting...'));
					}

					new TextField().load(tag, this);
					textfieldsLoaded++;
					this.progress(STATES.resources_load, getPercent());
					break;

				case 8:
				case 36: // Matrices
					this.banks[banksLoaded].matrices[matricesLoaded].load(tag, this);
					matricesLoaded++;
					break;

				case 9: // Color transforms
					this.banks[banksLoaded].colors[colorsLoaded].load(tag, this);
					colorsLoaded++;
					break;

				case 37: // Modifier
					this._modifiersCount = this.buffer.readUInt16LE();
					break;

				case 38:
				case 39:
				case 40:
					if (modifiersLoaded >= this._modifiersCount) {
						throw Error('Trying to load too many Modifiers! Aborting...');
					}

					new MovieClipModifier().load(tag, this);
					modifiersLoaded++;
					this.progress(STATES.resources_load, getPercent());
					break;

				case 42:
					new TransformBank().load(this);

					matricesLoaded = 0;
					colorsLoaded = 0;
					banksLoaded++;
					break;

				default:
					this.progress(STATES.unknown_tag, tag);
					this.buffer.skip(tagLength);
					break;
			}
		}
	}
}
