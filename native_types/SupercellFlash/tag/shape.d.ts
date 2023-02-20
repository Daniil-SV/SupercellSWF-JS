import { vector_get_length, vector_set_length, vector_item_getter, vector_item_remove, vector_item_setter } from "../../../src/node/Utils/Vector";

export class Shape {
    constructor(obj: {
        id: number,
        commands: Array<ShapeDrawBitmapCommand>
    });
    id: number;

    protected __get_command__: vector_item_getter<ShapeDrawBitmapCommand>;
    protected __insert_command__: vector_item_setter<ShapeDrawBitmapCommand>;
    protected __remove_command__: vector_item_remove;
    protected __get_commands_length__: vector_get_length;
    protected __set_commands_length__: vector_set_length;
}

export class ShapeDrawBitmapCommand {
    constructor(obj: {
        textureIndex: number,
        vertices: Array<ShapeDrawBitmapCommandVertex>
    });
    textureIndex: number;

    protected __get_vertex__: vector_item_getter<ShapeDrawBitmapCommandVertex>;
    protected __insert_vertex__: vector_item_setter<ShapeDrawBitmapCommandVertex>;
    protected __remove_vertex__: vector_item_remove;
    protected __get_vertices_length__: vector_get_length;
    protected __set_vertices_length__: vector_set_length;
}

export class ShapeDrawBitmapCommandVertex {
    constructor(obj: {
        x: number,
        y: number,
        u: number,
        v: number
    });

    x: number;
    y: number;
    u: number;
    v: number;
}
