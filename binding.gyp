{
    'targets': [
        {
            # Main binding target
            'target_name': 'Bindings',
            'win_delay_load_hook': 'false',
            'defines': ['NAPI_CPP_EXCEPTIONS'],
            'cflags_cc': ['-fexceptions'],
            "msvs_settings": {
                "VCCLCompilerTool": {
                    "ExceptionHandling": 1
                }
            },
            'sources': [
                'bindings/binding.cpp',
                'bindings/SupercellFlashNapi/SupercellSWF.cpp',
                "<!@(node -p \"require('fs').readdirSync('./bindings/SupercellFlashNapi/objects').map(f=>'bindings/SupercellFlashNapi/objects/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./bindings/SupercellFlashNapi/transformation').map(f=>'bindings/SupercellFlashNapi/transformation/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./bindings/SupercellCompressionNapi/').map(f=>'bindings/SupercellCompressionNapi/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
            ],
            'include_dirs': [
                "<!@(node -p \"require('node-addon-api').include\")",
                'bindings/',
                'deps/SC/SupercellBytestream/include',
                'deps/SC/SupercellCompression/include',
                'deps/SC/SupercellFlash/include',
            ],
            'dependencies': [
                "<!(node -p \"require('node-addon-api').gyp\")",
                'SupercellCompression',
                'SupercellFlash'
            ]
        },
        {
            # SupercellSWF and sub-classes target
            'target_name': 'SupercellFlash',
            'type': 'static_library',
            'defines': ['NAPI_CPP_EXCEPTIONS'],
            'cflags_cc': ['-fexceptions'],

            'configurations':
            {
                'Debug':
                {
                    'defines': ['SC_DEBUG']
                },
                'Release':
                {
                    'defines': ['SC_RELEASE']
                }
            },

            'include_dirs': [
                'deps/SC/SupercellBytestream/include',
                'deps/SC/SupercellFlash/include/',
                'deps/SC/SupercellFlash/src/',
                'deps/SC/SupercellCompression/include/'
            ],

            'sources': [
                "deps/SC/SupercellFlash/src/SupercellSWF.cpp",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellFlash/src/objects').map(f=>'deps/SC/SupercellFlash/src/objects/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellFlash/src/texture').map(f=>'deps/SC/SupercellFlash/src/texture/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellFlash/src/transformation').map(f=>'deps/SC/SupercellFlash/src/transformation/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")"
            ],

            'dependencies': ['SupercellCompression'],

            'cxxflags': [
                '-std=c17'
            ],

            'msvs_settings': {
                'VCCLCompilerTool': {
                    'AdditionalOptions': ['-std:c++17', ],
                },
            },
        },
        {
            # Compression lib for compressed files handling
            'target_name': 'SupercellCompression',
            'type': 'static_library',
            'include_dirs': [
                'deps/SC/SupercellCompression/include',
                'deps/SC/SupercellCompression/src',
                'deps/SC/SupercellBytestream/include',
                'deps/SC/external/lzma/include',
                'deps/SC/external/lzham/include',
                'deps/SC/external/zstd/include'
            ],
            'configurations':
            {
                'Debug':
                {
                    'defines': ['SC_DEBUG']
                },
                'Release':
                {
                    'defines': ['SC_RELEASE']
                }
            },
            "conditions": [
                [
                    "OS==\"win\"",
                    {
                        "defines": [
                            "SC_MULTITHEARD"
                        ]
                    }
                ]
            ],
            'sources': [
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellCompression/src/caching').map(f=>'deps/SC/SupercellCompression/src/caching/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellCompression/src/compression').map(f=>'deps/SC/SupercellCompression/src/compression/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellCompression/src/backend').map(f=>'deps/SC/SupercellCompression/src/backend/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")"
            ],
            'dependencies': ['LZMA', 'LZHAM', 'Zstandard'],
            'cflags_cc': ['-std=c++17'],
        },
        {
            # LZMA compression type
            'target_name': 'LZMA',
            'include_dirs': [
                'deps/SC/external/LZMA/include'
            ],
            'win_delay_load_hook': 'false',
            'type': 'static_library',
            'sources': [
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/lzma/src/').map(f=>'deps/SC/external/lzma/src/'+f).filter(f=>f.endsWith('.c')).join(' ')\")"
            ]
        },
        {
            # LZHAM compression type
            'target_name': 'LZHAM',
            'type': 'static_library',
            'win_delay_load_hook': 'false',
            'include_dirs': [
                'deps/SC/external/lzham/include',
                'deps/SC/external/lzham/src/lzhamcomp',
                'deps/SC/external/lzham/src/lzhamdecomp'
            ],

            'sources': [
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/lzham/src/').map(f=>'deps/SC/external/lzham/src/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/lzham/src/lzhamcomp/').map(f=>'deps/SC/external/lzham/src/lzhamcomp/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/lzham/src/lzhamdecomp/').map(f=>'deps/SC/external/lzham/src/lzhamdecomp/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")"

            ],

            'cxxflags': [
                '-std=c14'
            ],

            'msvs_settings': {
                'VCCLCompilerTool': {
                    'AdditionalOptions': ['-std:c++14', ],
                },
            },
        },
        {
            # ZSTD compression type
            'target_name': 'Zstandard',
            'type': 'static_library',
            'win_delay_load_hook': 'false',
            'include_dirs': [
                'deps/SC/external/zstd/include',
                'deps/SC/external/zstd/include/common',
                'deps/SC/external/zstd/include/compress',
                'deps/SC/external/zstd/include/decompress'
            ],

            'sources': [
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/zstd/src/common').map(f=>'deps/SC/external/zstd/src/common/'+f).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/zstd/src/compress').map(f=>'deps/SC/external/zstd/src/compress/'+f).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/zstd/src/decompress').map(f=>'deps/SC/external/zstd/src/decompress/'+f).filter(f=>f.endsWith('.c')).join(' ')\")"
            ],

            'conditions': [
                ['OS!="win"', {
                    'sources': ["deps/SC/external/Zstandard/src/decompress/huf_decompress_amd64.S"]
                }],
            ]
        }
    ]
}
