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
                'bindings/Main.cpp',
                'bindings/Utils.hpp',
                'bindings/Vector.hpp',
                'bindings/ScObject.hpp',
                'bindings/SupercellFlash_JS/common/Export.cpp',
                "<!@(node -p \"require('fs').readdirSync('./bindings/SupercellCompression_JS/').map(f=>'bindings/SupercellCompression_JS/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./bindings/SupercellFlash_JS/').map(f=>'bindings/SupercellFlash_JS/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")"
            ],
            'include_dirs': [
                "<!@(node -p \"require('node-binding').include\")",
                'bindings/',
                'deps/SC/SupercellFlash/src',
                'deps/SC/SupercellCompression/src/'
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
                'deps/SC/SupercellFlash/src/',
                'deps/SC/SupercellCompression/src/'
            ],

            'sources': [
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellFlash/src/SupercellFlash').map(f=>'deps/SC/SupercellFlash/src/SupercellFlash/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellFlash/src/SupercellFlash/common').map(f=>'deps/SC/SupercellFlash/src/SupercellFlash/common/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellFlash/src/SupercellFlash/tag').map(f=>'deps/SC/SupercellFlash/src/SupercellFlash/tag/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")"
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
                'deps/SC/SupercellCompression/src',
                'deps/SC/external/LZHAM/include',
                'deps/SC/external/LZMA/include',
                'deps/SC/external/Zstandard/include'
            ],
            'sources': [
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellCompression/src/SupercellCompression').map(f=>'deps/SC/SupercellCompression/src/SupercellCompression/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellCompression/src/SupercellCompression/cache').map(f=>'deps/SC/SupercellCompression/src/SupercellCompression/cache/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellCompression/src/SupercellCompression/backend').map(f=>'deps/SC/SupercellCompression/src/SupercellCompression/backend/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellCompression/src/SupercellCompression/common').map(f=>'deps/SC/SupercellCompression/src/SupercellCompression/common/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")"
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
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/LZMA/src/').map(f=>'deps/SC/external/LZMA/src/'+f).filter(f=>f.endsWith('.c')).join(' ')\")"
            ]
        },
        {
            # LZHAM compression type
            'target_name': 'LZHAM',
            'type': 'static_library',
            'win_delay_load_hook': 'false',
            'include_dirs': [
                'deps/SC/external/LZHAM/include',
                'deps/SC/external/LZHAM/src/lzhamcomp',
                'deps/SC/external/LZHAM/src/lzhamdecomp'
            ],

            'sources': [
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/LZHAM/src/').map(f=>'deps/SC/external/LZHAM/src/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/LZHAM/src/lzhamcomp/').map(f=>'deps/SC/external/LZHAM/src/lzhamcomp/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/LZHAM/src/lzhamdecomp/').map(f=>'deps/SC/external/LZHAM/src/lzhamdecomp/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")"

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
                'deps/SC/external/Zstandard/include',
                'deps/SC/external/Zstandard/include/common',
                'deps/SC/external/Zstandard/include/compress',
                'deps/SC/external/Zstandard/include/decompress'
            ],

            'sources': [
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/Zstandard/src/common').map(f=>'deps/SC/external/Zstandard/src/common/'+f).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/Zstandard/src/compress').map(f=>'deps/SC/external/Zstandard/src/compress/'+f).join(' ')\")",
                "<!@(node -p \"require('fs').readdirSync('./deps/SC/external/Zstandard/src/decompress').map(f=>'deps/SC/external/Zstandard/src/decompress/'+f).filter(f=>f.endsWith('.c')).join(' ')\")"
            ],

            'conditions': [
                ['OS!="win"', {
                    'sources': ["deps/SC/external/Zstandard/src/decompress/huf_decompress_amd64.S"]
                }],
            ]
        }
    ]
}
