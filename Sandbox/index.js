const SC = require("../");
const Native_SC = require("../lib/native")
const {
    extend_to
} = require("../lib/node/Utils/utils")
const util = require("util")

/* const s = new SC.Shape({
    commands: [
        new SC.ShapeDrawCommand({
            vertices: [
                new SC.ShapeDrawCommandVertex({
                    x: 10
                })
            ]
        })
    ]
}); */
new SC.Shape({id: 10, commands: [new SC.ShapeDrawCommand({textureIndex: 10, vertices: [new SC.ShapeDrawCommandVertex({x: 10, y: 10})] })]})
