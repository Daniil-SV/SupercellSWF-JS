{
    "targets": [
        {
            "target_name": "Bindings",
            "win_delay_load_hook": "false",
            'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
            'cflags!': [ '-fno-exceptions' ],
            'cflags_cc!': [ '-fno-exceptions' ],
            "sources": [
                "bindings/Main.cpp",
                "bindings/Utils.cpp",
                "<!@(node -p \"require('fs').readdirSync('./bindings/SupercellCompression/').map(f=>'bindings/SupercellCompression/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")"
            ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")",
                "bindings/",
                "deps/SC/SupercellSWF/src",
                "deps/SC/SupercellCompression/src/"
            ],
            "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")", "SupercellCompression"]
        },
		{
            "target_name": "SupercellCompression",
            "type": "static_library",
            "include_dirs": [
				"deps/SC/SupercellCompression/src",
				"deps/SC/external/LZHAM/include",
				"deps/SC/external/LZMA/include",
				"deps/SC/external/Zstandard/include"
            ],
            "sources": [
				"<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellCompression/src/SupercellCompression').map(f=>'deps/SC/SupercellCompression/src/SupercellCompression/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
				"<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellCompression/src/SupercellCompression/cache').map(f=>'deps/SC/SupercellCompression/src/SupercellCompression/cache/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
				"<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellCompression/src/SupercellCompression/backend').map(f=>'deps/SC/SupercellCompression/src/SupercellCompression/backend/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
				"<!@(node -p \"require('fs').readdirSync('./deps/SC/SupercellCompression/src/SupercellCompression/common').map(f=>'deps/SC/SupercellCompression/src/SupercellCompression/common/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")"
            ],
			"dependencies": ["LZHAM", "LZMA", "Zstandard"],
            "cflags": [
                "-std=c17"
            ]
        },
        {
            "target_name": "LZHAM",
            "type": "static_library",
            "win_delay_load_hook": "false",
            "include_dirs": [
                "deps/SC/external/LZHAM/include",
                "deps/SC/external/LZHAM/src/lzhamcomp",
                "deps/SC/external/LZHAM/src/lzhamdecomp"
            ],

            "sources": [
				"<!@(node -p \"require('fs').readdirSync('./deps/SC/external/LZHAM/src/').map(f=>'deps/SC/external/LZHAM/src/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
				"<!@(node -p \"require('fs').readdirSync('./deps/SC/external/LZHAM/src/lzhamcomp/').map(f=>'deps/SC/external/LZHAM/src/lzhamcomp/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")",
				"<!@(node -p \"require('fs').readdirSync('./deps/SC/external/LZHAM/src/lzhamdecomp/').map(f=>'deps/SC/external/LZHAM/src/lzhamdecomp/'+f).filter(f=>f.endsWith('.cpp')).join(' ')\")"
				
            ],
            "cflags": [
                "-std=c14"
            ]
        },
		{
            "target_name": "LZMA",
            "type": "static_library",
            "win_delay_load_hook": "false",
            "include_dirs": [
                "deps/SC/external/LZMA/include"
            ],

            "sources": [
				"<!@(node -p \"require('fs').readdirSync('./deps/SC/external/LZMA/src/').map(f=>'deps/SC/external/LZMA/src/'+f).filter(f=>f.endsWith('.c')).join(' ')\")"
				
            ]
        },
		{
            "target_name": "Zstandard",
            "type": "static_library",
            "win_delay_load_hook": "false",
            "include_dirs": [
                "deps/SC/external/Zstandard/include",
				"deps/SC/external/Zstandard/include/common",
				"deps/SC/external/Zstandard/include/compress",
				"deps/SC/external/Zstandard/include/decompress"
            ],

            "sources": [
				"<!@(node -p \"require('fs').readdirSync('./deps/SC/external/Zstandard/src/common').map(f=>'deps/SC/external/Zstandard/src/common/'+f).filter(f=>f.endsWith('.c')).join(' ')\")",
				"<!@(node -p \"require('fs').readdirSync('./deps/SC/external/Zstandard/src/compress').map(f=>'deps/SC/external/Zstandard/src/compress/'+f).filter(f=>f.endsWith('.c')).join(' ')\")",
				"<!@(node -p \"require('fs').readdirSync('./deps/SC/external/Zstandard/src/decompress').map(f=>'deps/SC/external/Zstandard/src/decompress/'+f).filter(f=>f.endsWith('.c')).join(' ')\")"
				
            ]
        }
    ]
}
