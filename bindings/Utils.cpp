#include "Utils.h"

namespace scNapi
{
    bool Utils::processCompressorError(Napi::Env env, sc::CompressorError res)
    {
        switch (res)
        {
        case sc::CompressorError::COMPRESS_ERROR:
            throwException(env,
                "Failed to compress file!");
            break;
        case sc::CompressorError::DECOMPRESS_ERROR:
            throwException(env,
                "Failed to decompress file!");
            break;
        case sc::CompressorError::FILE_READ_ERROR:
            throwException(env,
                "Failed to read file!");
            break;
        case sc::CompressorError::FILE_WRITE_ERROR:
            throwException(env,
                "Failed to write file!");
            break;
        case sc::CompressorError::WRONG_FILE_ERROR:
            throwException(env,
                "Wrong file!");
            break;
        default:
            return true;
        }

        return false;
    }

    void Utils::throwException(Napi::Env env, const std::string message)
    {
        Napi::TypeError::New(env, message.c_str()).ThrowAsJavaScriptException();
    }
}
