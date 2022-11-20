import { SupercellSWF } from './swf';

/**
 * Class for managing export names
 */
export class Exports {
	private idsList: Array<number> = [];
	private exportsList: Array<string> = [];

	/**
	 * Method that loads a exprot names from a buffer
	 * @param {SupercellSWF} swf SupercellSWF instance
	 * @returns Current Exports object
	 */
	load(swf: SupercellSWF): Exports {
		const exportCount: number = swf.buffer.readUInt16LE();

		for (let i = 0; exportCount > i; i++) {
			this.idsList.push(swf.buffer.readUInt16LE());
		}

		for (let n = 0; exportCount > n; n++) {
			const exportName = swf.buffer.readASCII();
			if (!exportName) {
				throw new Error('Invalid export name in file!');
			}

			this.exportsList.push(exportName);
		}
		return this;
	}

	/**
	 * Method that writes export names to buffer
	 * @param {SupercellSWF} swf SuperecellSWF instance
	 */
	save(swf: SupercellSWF): void {
		swf.buffer.writeUInt16LE(this.idsList.length);
		for (let i = 0; this.idsList.length > i; i++) {
			swf.buffer.writeUInt16LE(this.idsList[i]);
		}
		for (let i = 0; this.idsList.length > i; i++) {
			swf.buffer.writeASCII(this.exportsList[i]);
		}
	}

	/**
	 * Adds a new export name
	 * @param {number} id Object ID
	 * @param {string} name Export name
	 * @returns Current Exports object
	 */
	addExport(id: number, name: string): Exports {
		this.idsList.push(id);
		this.exportsList.push(name);
		return this;
	}

	/**
	 * Removes an ID (and all export names associated with it) or an export name
	 * @param {string | number} toRemove ID or export name to be removed
	 * @returns Current Exports object
	 */
	removeExport(toRemove: string | number): Exports {
		switch (typeof toRemove) {
			case 'string':
				const exportIndex = this.exportsList.indexOf(toRemove);
				if (exportIndex > 0) {
					this.idsList.splice(exportIndex, 1);
					this.exportsList.splice(exportIndex, 1);
				}
				break;

			case 'number':
				const exports: Array<string> = this.getExportsById(toRemove);
				for (let i = 0; exports.length > i; i++) {
					this.removeExport(exports[i]);
				}
				break;
		}
		return this;
	}

	/**
	 * Gives all export names
	 * @returns {Array<string>} Array of export names
	 */
	getExports(): Array<string> {
		return this.exportsList;
	}

	/**
	 * Gives all IDs
	 * @returns {Array<number>} Array of IDs
	 */
	getIds(): Array<number> {
		return [...new Set(this.idsList)];
	}

	/**
	 * Returns all export names associated with given ID
	 * @param {number} id Object ID
	 * @returns {Array<string>} Array of export names
	 */
	getExportsById(id: number): string[] | undefined {
		if (!this.idsList.includes(id)) {
			return undefined;
		}

		const exports = [];
		let i = -1;
		while ((i = this.idsList.indexOf(id, i + 1)) !== -1) {
			exports.push(this.exportsList[i]);
		}
		return exports;
	}

	/**
	 * Returns ID of given export name. Returns undefind if name is not found.
	 * @param {string} exportName Export name whose ID need to find
	 * @returns {number} Export name ID
	 */
	getExportId(exportName: string): number | undefined {
		const exportIndex = this.exportsList.indexOf(exportName);
		if (exportIndex < 0) {
			return undefined;
		}
		return this.idsList[exportIndex];
	}

	/**
	 * Clones a Exports storage object
	 * @returns {Matrix} Exports clone
	 */
	clone(): Exports {
		const exportsClone = new Exports();

		for (let i = 0; this.idsList.length > i; i++) {
			exportsClone.addExport(this.idsList[i], this.exportsList[i]);
		}

		return exportsClone;
	}

}
