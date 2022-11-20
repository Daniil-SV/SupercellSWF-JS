import { Box } from '../types';
import { MovieClipFrame } from './frame';
import { MODIFIERS } from './modifier';
import { BLENDMODES } from './movie_clip';
/**
 * Interface for MovieClip bind.
 * @category Dictionary interface
 */
export interface Bind {
    /**
     * Object ID
     */
    id: number;
    /**
     * Blending method that bind should use.
     */
    blend?: BLENDMODES;
    /**
     * Name of bind. Usually used in the game code to define a specific bind.
     */
    name?: string | undefined;
}
/**
 * Interface for MovieClip frame elements.
 * @category Dictionary interface
 */
export interface FrameElement {
    bind: number;
    matrix: number | undefined;
    color: number | undefined;
}
/**
 * Interface for MovieClip
 * @category Class interface
 */
export interface IMovieCLip {
    framerate: number;
    binds: Bind[];
    frames: MovieClipFrame[];
    nineSlice: Box | undefined;
    bankIndex: number;
    hasBlend: boolean;
}
/**
 * Interface for MovieClipFrame
 * @category Class interface
 */
export interface IMovieClipFrame {
    /**
     * Name of frame object
     */
    name: string | undefined;
    /**
     * List of objects that will be shown in the frame
     * (Note the order works like layers but in reverse order)
     */
    elements: FrameElement[];
}
/**
 * Interface for MovieClipModifier
 * @category Class interface
 */
export interface IMovieClipModifier {
    modifier: MODIFIERS;
}
