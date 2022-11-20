/**
 * Interface for Color
 * @category Class interface
 */
export interface IColor {
    A_add: number;
    R_add: number;
    G_add: number;
    B_add: number;
    A_mul: number;
    R_mul: number;
    G_mul: number;
    B_mul: number;
}
/**
 * Interface for Matrix
 * @category Class interface
 */
export interface IMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
    detailed: boolean;
}
