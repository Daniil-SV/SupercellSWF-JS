#include "Utils.h"

namespace scNode
{
    void Utils::processCompressorError(Napi::Env env, sc::CompressorError res)
    {
        switch (res)
        {
        case sc::CompressorError::COMPRESS_ERROR:
            Napi::TypeError::New(env, "Failed to compress file!").ThrowAsJavaScriptException();
        case sc::CompressorError::DECOMPRESS_ERROR:
            Napi::TypeError::New(env, "Failed to decompress file!").ThrowAsJavaScriptException();
        case sc::CompressorError::FILE_READ_ERROR:
            Napi::TypeError::New(env, "Failed to read file!").ThrowAsJavaScriptException();
        case sc::CompressorError::FILE_WRITE_ERROR:
            Napi::TypeError::New(env, "Failed to write file!").ThrowAsJavaScriptException();
        case sc::CompressorError::WRONG_FILE_ERROR:
            Napi::TypeError::New(env, "Wrong file!").ThrowAsJavaScriptException();
        default:
            break;
        }
    }
}
