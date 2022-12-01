
<h1 align="center">SupercellSWF</h>

<h3 align="center"> Nodes.js module for loading and processing SupercellSWF assets.
    <br> 
</h3>
<br> 


## Installing
Installation is very simple, enter command below and module will be ready to use
```
npm i supercell-swf
```

## About
The project is not completely ready and it is still in development. A lot is still planned. If you have ideas for improvement, please share them with us on our [Discord](https://discord.gg/MQTg7shTpQ). server. Any ideas and wishes are welcome. 

## Examples
"Examples" folder contains several files that show all the required features

## Documentation
Documentation is generated automatically from the code. To generate, enter command in module folder:
```
npm run docs
```
A "docs" folder will be generated which will contain index.html documentation page

You can also take a look at [wiki](https://github.com/scwmake/supercell-swf-ts/wiki).

## Compression table
Not all compression types are currently supported. See below for more details.

| Compression type |     Support     |                Binary header(BE)                |
|:----------------:|:---------------:|:-----------------------------------------------:|
|       NONE       |       Full      |       Any other than 0x53430000 and below       |
|       LZMA       |       Full      | Fast mode -0x5D000004. Normal mode - 0x5D000004 |
|       LZHAM      | Not implemented |                                                 |
|       ZSTD       |       Full      |                    0x28B52FFD                   |
|       "SIG"      | Not implemented |                                                 |

## Authors
- [@Daniil-SV](https://github.com/Daniil-SV) - All code
- [@Fred-31](https://github.com/Fred-31) - Inspiration from his version of SupercellSWF and also a little help during creation
- [@Vorono4ka](https://github.com/Vorono4ka) - Support during creation ❤
- [@Lilmuff2](https://github.com/lilmuff2) - Tester and helper

## TODO
- Improve interaction with Matrix in movie clips.
- Add support for all compressions.


