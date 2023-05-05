
<h1 align="center">SupercellSWF</h>

<h3 align="center"> Node.js native module for loading and processing SupercellSWF assets.
    <br> 
</h3>
<br> 

# Installing 

```
npm i supercell-swf
```

# Platforms

Module has been tested on the following platforms:

- Windows (x64)
- Linux (x64)
- Android (arm64, through Termux)

All of these platforms have prebuilds for the binary side.
This means that module on these platforms will work out of the box, without the need to install additional tools.

# Module API

## Vectors and object constructor

To implement interaction of native environment objects from JS environment, a custom implementation of arrays was created. It does not include all functions and some functions work a little differently. But basic functions (and even a little more) for working with arrays of objects are still available.
- All functions that returned a new array in the built-in array now return this.
-  Push function has also changed its behavior. It accepts an instance of an object of its type. If this object is not an instance, then a new object will be initialized, in constructor of which object will be passed, which will be passed to push function.  

## DisplayObject
This is a generic type for objects that have IDs.  
Objects of this type are:
- Shape
- TextField
- MovieClipModifier
- MovieClip

## Module
After importing the module, you will have access to an object that contains:

## CompressionSignature

An enum that contains all compressed types that are supported  
  
Types of compressions that are supported:  
- LZMA
- LZHAM
- ZSTD

## SupercellCompression
This object is needed to compress or get content from compressed Supercell files such as .sc or compressed .csv files.  
Has 2 sub-objects for compression and decompression.  
  
Decompressor:
- decompressFile:  
Decompresses the file at the specified path to cache folder, and returns path to decompressed file.

- decompress:  
Accepts a buffer and returns decompressed content

- commonDecompress:  
Accepts a file buffer, something like a compressed .csv  
  
All functions in Compressor have as argument CompressionSignature which specifies what kind of compression file or buffer will have  
Compressor:  
- compressFile:  
Compresses a file from specified file to another specified file with specified compression type.  
Can accept a buffer for metadata to be inserted at the end of file.
- compress:  
Compresses a buffer with specified compression type and returns a compressed "SC" buffer.  
It can also accept a buffer with metadata. 
- commonCompress:
Compresses the buffer with the specified compression type and returns the compressed buffer without additional headers. Needed for .csv files. 

## SupercellSWF
This is the main class for loading .sc files.  
It has variables:  
- useExternalTexture:  
Boolean which shows whether external "_tex.sc" texture will be saved  
- useMultiResTexture:  
When this and useExternalTexture variable is enabled, creates a texture file with multiResSuffix and a lowres file with lowResSuffix, regardless of whether hasLowresTexture is enabled.
- useLowResTexture:  
Specifies whether file can automatically use lowres file.
- multiResSuffix:  
Suffix for MultiRes texture.
- lowResSuffix:  
Suffix for LowRes texture.  

It contains vectors (arrays) of objects for:  
- Export names
- MovieClips
- TextFields
- Shapes
- MatrixBanks
- MovieClipModifiers
- SWFTexture  
  
About all these objects below

## ExportName
Export name is needed to point to some DisplayObject and specify its name for use outside the file area  
It has variables:  
- id: 
DisplayObject ID
- name
name for DisplayObject

## PixelFormat
Enum for SWFTexture which describes pixel types from data buffer
Has following types:
- RGBA8
- RGBA4
- RGB5_A1
- RGB565
- LUMINANCE8_ALPHA8
- LUMINANCE8
A description of each type and how to read them can be easily found on internet.

## Filters
Enum for SWFTexture which describes filters for textures
Has following types:
- LINEAR
- NEAREST
- LINEAR_MIPMAP_NEAREST

## SWFTexture
Texture atlas that contains all sprites  
It has variables:  
- width
- height
- pixelFormat:  
Uses PixelFormat enum to describe a pixel type
- downscaling
- magFilter:  
Uses Filter enum to describe filter type
- minFilter
- data:  
Buffer with image raw data

## ModifierType
Enum for MovieClipModifier which describes modifier type
Has following types:
- Mask:
Means that the next element will be rendered as a mask-layer
- Masked:  
Means that all elements after this modifier will be rendered as masked layers of the previous mask layer.
- Unmasked: 
Marks the end of Masked modifier

## MovieClipModifier
Included as a render object for use in frames to "modify" them
It has variables: 
- type:  
Uses ModifierType enum to describe type of modification.

## ShapeDrawCommandVertex
Class for storing information about vertices in ShapeDrawBitmapCommand  
It has variables: 
- x
- y
- u 
- v

## ShapeDrawBitmapCommand
Class for rendering a sprite from a texture  
It has variables: 
- textureIndex:  
Index of texture from textures vector in SupercellSWF class
It contains vector:
- vertices:  
Contains ShapeDrawCommandVertex objects

## Shape
Command storage  
It contains vector:
- commands:  
Contains ShapeDrawBitmapCommand objects

## TextField
Objects that store text properties  
It has variables: 
- text
- fontName
- fontColor
- fontSize
- fontAlign:  
Maybe using bits to compactly fit some other boolean values
- left
- top
- right
- bottom
- isBold
- isItalic
- isMultiline
- isOutlined
- outlineColor
- useDeviceFont
- autoAdjustFontBounds  
It also has some unknown flags, they are just there to make sure some files are saved correctly
- unknownFlag
- unknownShort
- unknownShort2

## MatrixBank
Object for placing matrices and color transformations. Needed to expand limit (UINT16_MAX) of transformations in file.
It contains vectors:
- matrices:
Array of Matrix2x3
- colorTransformations:  
Vector of ColorTransofmation

## Matrix2x3
Affine 2z3 matrix for transforming objects on screen

## ColorTransform
Manipulates color properties of an object on screen

## DisplayObjectInstance
Also known as "Movie Clip Bind". Needed to specify a "link" to another DisplayObject in a MovieClip
It has variables: 
- id
- blend:  
index of blend mode
- name:
name of "link"

## MovieClipFrame
An object that describes number of MovieClipFrameElement that frame should use
It has variable: 
- elementsCount
- label

## MovieClipFrameElement
Object with object transformation and index to DisplayObjectInstance
It has variables: 
- instanceIndex:  
index to DisplayObjectInstance
- matrixIndex
index to Matrix2x3 in MatrixBank
- colorTransformIndex
index to ColorTransformation in MatrixBank

## MovieClip
Storage for DisplayObjectInstance, MovieClipFrame, MovieClipFrameElement
It has variables: 
- frameRate:  
frame per second
- scalingGrid:  
also known as 9-slice or nine-slice
- matrixBankIndex:
Bank index in matrixBanks in SupercellSWF. Used to get transformations from MovieClipFrameElement  
It contains vectors:
- instances:  
Array of DisplayObjectInstance (or binds)
- frames:  
Array of MovieClipFrame
- frameElements:  
Array of MovieClipFrameElement

# Building
Please note that the module may not build correctly on platforms where it has not been tested. 

Before you begin, you will need to install the C++ build tools.  
On Windows, you can do this by installing Visual studio.  
On Linux, you can install the "build-essential" package.  

First you need to clone this repository with command:  
```
git clone https://github.com/scwmake/SupercellSWF-JS.git
```
Then go to repo folder 
```
cd SupercellSWF-JS
```
Init and update submodules
```
git submodule init
git subomodules update --remote
```
Run command
```
npm i --save-dev
```

If node-gyp and typescript are configured correctly, then after that JS side will be compiled and then native side.

# Any questions?
For any questions or help, you can contact me using Discord: "Daniil SV#6571"