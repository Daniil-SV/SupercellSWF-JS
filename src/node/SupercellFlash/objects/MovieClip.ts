import * as util from "util";

import {
  NATIVE_DISPLAY_OBJECT,
  NATIVE_MOVIECLIP,
  NATIVE_MOVIECLIP_ELEMENT,
  NATIVE_MOVIECLIP_FRAME,
} from "../../../native";
import { Vector } from "../../Utils/Vector";

export class DisplayObjectInstance extends NATIVE_DISPLAY_OBJECT {
  [Symbol.toStringTag](): string {
    return "DisplayObjectInstance";
  }

  [util.inspect.custom](): string {
    return `<${this[Symbol.toStringTag]()} id: ${this.id}, blend: ${
      this.blend
    }, name: "${this.name}" >`;
  }

  toJSON(): object {
    return {
      id: this.id,
      blend: this.blend,
      name: this.name,
    };
  }
}

export class MovieClipFrame extends NATIVE_MOVIECLIP_FRAME {
  [Symbol.toStringTag](): string {
    return "MovieClipFrame";
  }

  [util.inspect.custom](): string {
    return `<${this[Symbol.toStringTag]()} name: ${this.label}, count: ${
      this.elementsCount
    } >`;
  }

  toJSON(): object {
    return {
      label: this.label,
      elementsCount: this.elementsCount,
    };
  }
}

export class MovieClipFrameElement extends NATIVE_MOVIECLIP_ELEMENT {
  [Symbol.toStringTag](): string {
    return "MovieClipFrameElement";
  }

  [util.inspect.custom](): string {
    return `<${this[Symbol.toStringTag]()} index: ${
      this.instanceIndex
    }, matrix: ${this.matrixIndex}, color: ${this.colorTransformIndex} >`;
  }

  toJSON(): object {
    return {
      instanceIndex: this.instanceIndex,
      matrixIndex: this.matrixIndex,
      colorTransformIndex: this.colorTransformIndex,
    };
  }
}

export class MovieClip extends NATIVE_MOVIECLIP {
  readonly instances = new Vector<MovieClip, DisplayObjectInstance>(
    {
      Initializer: DisplayObjectInstance,
      getItem: this.__get_instances__,
      insertItem: this.__insert_instances__,
      removeItem: this.__remove_instances__,
      getLength: this.__get_length_instances__,
      setLength: this.__set_length_instances__,
    },
    this
  );

  readonly frames = new Vector<MovieClip, MovieClipFrame>(
    {
      Initializer: MovieClipFrame,
      getItem: this.__get_frames__,
      insertItem: this.__insert_frames__,
      removeItem: this.__remove_frames__,
      getLength: this.__get_length_frames__,
      setLength: this.__set_length_frames__,
    },
    this
  );

  readonly frameElements = new Vector<MovieClip, MovieClipFrameElement>(
    {
      Initializer: MovieClipFrameElement,
      getItem: this.__get_frameElements__,
      insertItem: this.__insert_frameElements__,
      removeItem: this.__remove_frameElements__,
      getLength: this.__get_length_frameElements__,
      setLength: this.__set_length_frameElements__,
    },
    this
  );

  [Symbol.toStringTag](): string {
    return "MovieClip";
  }

  [util.inspect.custom](depth: number): string {
    const depthLength = 2 * depth;
    let instances = "";

    const instancesLength =
      depthLength > this.instances.length ? this.instances.length : depthLength;
    for (let i = 0; instancesLength > i; i++) {
      instances += `${util.inspect(this.instances[i], false, depth - 1)} `;
    }
    if (instancesLength !== this.instances.length) {
      instances += `and ${this.instances.length - instancesLength} items..`;
    }

    return `<${this[Symbol.toStringTag]()} instances: [ ${instances} ] >`;
  }

  toJSON(): object {
    return {
      frameRate: this.frameRate,
      unknownFlag: this.unknownFlag,
      scalingGrid: this.scalingGrid,
      matrixBankIndex: this.matrixBankIndex,
      instances: this.instances,
    };
  }
}
