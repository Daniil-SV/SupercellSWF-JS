#pragma once

#include <napi.h>
#include <SupercellCompression.h>

namespace scNode
{
    struct Utils
    {
        static void processCompressorError(Napi::Env env, sc::CompressorError res);
    };
}
