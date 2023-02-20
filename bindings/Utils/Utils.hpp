#pragma once

#include <napi.h>
#include <SupercellCompression.h>
#include "ScObject.hpp"

namespace scNapi
{
    struct Utils
    {
        static bool processCompressorError(Napi::Env env, sc::CompressorError res)
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

        static void throwException(Napi::Env env, const std::string message)
        {
            Napi::TypeError::New(env, message.c_str()).ThrowAsJavaScriptException();
        }

        template <class T>
        static void initializeClass(ScObject<T>* context, const Napi::CallbackInfo& info)
        {
            if (info[0].IsObject())
            {
                context->new_parent();
                context->fromObject(info[0].ToObject());
            }
            else if (info[0].IsExternal())
            {
                context->set_parent(info[0].As<Napi::External<T>>().Data());
            }
            else
            {
                context->new_parent();
            }
        }
    };
}
