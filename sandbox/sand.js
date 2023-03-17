const { randomBytes } = require("crypto");
const {
    DisplayObjectInstance,
    ExportName,
    Matrix2x3,
    MatrixBank,
    ModifierType,
    MovieClip,
    MovieClipFrame,
    MovieClipFrameElement,
    MovieClipModifier,
    PixelFormat,
    Shape,
    ShapeDrawBitmapCommand,
    ShapeDrawCommandVertex,
    SupercellSWF,
    SWFTexture,
    TextField,
} = require("../");

const propertyObject = {
    useExternalTexture: true,
    useMultiResTexture: true,
    useLowResTexture: true,
    multiResTextureSuffix: "_multiresTexture",
    lowResTextureSuffix: "_lowresTexture",
    matrixBanks: [
        new MatrixBank({
            matrices: [new Matrix2x3({
                a: 0.5,
                d: 0.5
            })]
        }),
    ],
    exports: [new ExportName({
        id: 3,
        name: "someMovieClip"
    })],
    textures: [
        new SWFTexture({
            pixelFormat: PixelFormat.LUMINANCE8,
            width: 5,
            height: 5,
            data: randomBytes(5 * 5),
        }),
    ],
    shapes: [
        new Shape({
            id: 0,
            commands: [
                new ShapeDrawBitmapCommand({
                    textureIndex: 0,
                    vertices: [
                        new ShapeDrawCommandVertex({
                            x: 10,
                            y: 10,
                            u: 0,
                            v: 0
                        }),
                        new ShapeDrawCommandVertex({
                            x: 10,
                            y: -10,
                            u: 0,
                            v: 5
                        }),
                        new ShapeDrawCommandVertex({
                            x: -10,
                            y: -10,
                            u: 5,
                            v: 5
                        }),
                        new ShapeDrawCommandVertex({
                            x: -10,
                            y: 10,
                            u: 5,
                            v: 0
                        }),
                    ],
                }),
            ],
        }),
    ],
    textFields: [new TextField({
        id: 1,
        text: "SomeDumbText"
    })],
    movieClipModifiers: [
        new MovieClipModifier({
            id: 2,
            type: ModifierType.Mask
        }),
    ],
    movieClips: [
        new MovieClip({
            id: 3,
            frameRate: 30,
            instances: [
                new DisplayObjectInstance({
                    id: 0
                }),
                new DisplayObjectInstance({
                    id: 1
                }),
                new DisplayObjectInstance({
                    id: 2
                }),
            ],
            frameElements: [
                new MovieClipFrameElement({
                    instanceIndex: 0,
                    matrixIndex: 0
                }),
                new MovieClipFrameElement({
                    instanceIndex: 1
                }),
                new MovieClipFrameElement({
                    instanceIndex: 2
                }),
            ],
            frames: [new MovieClipFrame({
                elementsCount: 3,
                label: "firstFrame"
            })],
        }),
    ],
};

function createInstance(setProperty = false) {
    return new SupercellSWF(setProperty ? propertyObject : {});
}

console.log(createInstance(true));