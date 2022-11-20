//Creating file from scratch

const { Image } = require("image-js");
const PNG = require("fast-png");

const { SupercellSWF, Texture, Shape, ShapeDrawCommand, COMPRESSION, MovieClip, MovieClipFrame, TransformBank, Matrix } = require("../");
const { readFileSync } = require("fs");
const path = require("path");

const outFile = "./fish.sc";

let start = process.hrtime();

//Creating a new swf class
let swf = new SupercellSWF();
swf.compression = COMPRESSION.LZMA;

//Creating a new "atlas"
let atlas = new Texture();

//we could use the built-in methods of image-js, but since they are asynchronous, we will do it manually

//png data
let image = PNG.decode(readFileSync("./Assets/fish.png"));

atlas.image = new Image(image.width, image.height, image.data, {
    components: image.channels % 2 == 0 ? image.channels - 1 : image.channels,
    alpha: image.channels % 2 == 0 ? true : false,
    bitDepth: image.depth,
});

//Adding texture to sc
swf.textures.push(atlas);

//With shape, we can use graphics resources from textures. Basically, it's just a 2D mesh.
let shape = new Shape();

//Bitmap for this resource
let shape_bitmap = new ShapeDrawCommand();

//Bitmap texture atlas index
shape_bitmap.textureIndex = swf.textures.indexOf(atlas);

//Points on texture
shape_bitmap.uvCoords = [
    [0, 0],
    [atlas.image.width, 0],
    [atlas.image.width, atlas.image.height],
    [0, atlas.image.height]
];

//Creating a coordinate for a view in the game
let xyCoords = [
    [0, 0],
    [atlas.image.width, 0],
    [atlas.image.width, atlas.image.height],
    [0, atlas.image.height]
].map(point => {
    //move to center and resize
    return [(point[0] - (atlas.image.width / 2)) * 0.1 , (point[1] - (atlas.image.height / 2)) * 0.1];
});

shape_bitmap.xyCoords = xyCoords;

//Denormalization is very useful if we want to use an external texture, then we can replace it at any time with a smaller or larger one, and the bitmap will not lose its properties.
//In other cases, normalization makes no sense and is not necessary.
shape_bitmap.normalize(swf);

//Adding a bitmap to shape
shape.bitmaps.push(shape_bitmap);

//Adding a resource to swf
var shapeId = 0
swf.resources[shapeId] = shape;

//New bank for transforms in movie clip
let transformBank = new TransformBank();
swf.banks.push(transformBank);

//With a movie clip, we can animate different objects that also have IDs
let movieClip = new MovieClip();
movieClip.framerate = 30;
movieClip.bankIndex = swf.banks.indexOf(transformBank);

//add a bind to use in frames
movieClip.binds.push({
    id: shapeId,
    blend: 0,
    name: "fish_static_shape"
});

//Each frame fish will rotate by one degree
for (let i = 0; 360 > i; i++) {
    let frame = new MovieClipFrame();

    let frameMatrix = new Matrix().rotateX(i * (Math.PI / 180));
    frame.elements.push({
        bind: 0,
        matrix: frameMatrix

    })

    movieClip.frames.push(frame);
}

//Convert all matrices to transformation bank indices. If this is not done, transformation will not be written.
movieClip.toBank(swf);

var movieclipId = 1;
//Create an ID and add it to resources
swf.resources[movieclipId] = movieClip;

//Adding an export name for movie clip that you can use in the game. 
//Please note, in theory you can give any resource with an id an export name, but most likely the game will just crash
swf.exports.addExport(movieclipId, "fish");

swf.save(outFile);

let result = process.hrtime(start);

console.log(`Sc file with "fish" export name saved to ${path.dirname(path.resolve(outFile))} and and it took ${result} seconds!`);
