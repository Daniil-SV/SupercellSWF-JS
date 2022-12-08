# Compressions
All compression methods that use Supercell are collected here.
If you have any problems with native methods, you can use executable in module folder or specify path in the global variable to executable file.
Below are Windows based examples for each type of compression

## LZMA
For Linux compatibility, [XZ](https://tukaani.org/xz/) is used here.

Download archive from [here](https://tukaani.org/xz/xz-5.2.9-windows.zip) and extract xz.exe from it. Rename it to lzma.exe and put them in module folder.

## ZSTD
Download archive from [releases](https://github.com/facebook/zstd/releases/). Extract zstd.exe from there and put them in module folder.

<br></br>

Final structure will look something like this:
- lib
- index.js
- package.json
- lzma.exe
- zstd.exe