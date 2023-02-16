#pragma once

#include <napi.h>
#include <SupercellCompression.h>

namespace scNapi
{
    struct Utils
    {
        static bool processCompressorError(Napi::Env env, sc::CompressorError res);
        static void throwException(Napi::Env env, const std::string message);
    }; 
}
