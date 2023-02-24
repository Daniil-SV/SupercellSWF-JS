#pragma once

#include <napi.h>
#include <SupercellCompression.h>
#include "ScObject.hpp"
#include "Vector.hpp"

#include <iostream>

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
                context->fromObject(info.Env(), info[0].ToObject());
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

        static std::vector<Napi::Value> IteratorData(Napi::Env& env, Napi::Object& object)
        {
            std::vector<Napi::Value> ret;

            Napi::Function symbol = object.Get(Napi::Symbol::WellKnown(env, "iterator")).As<Napi::Function>();
            Napi::Object iterator = symbol.Call(object, {}).As<Napi::Object>();
            Napi::Function next = iterator.Get("next").As<Napi::Function>();

            while (true)
            {
                Napi::Object nextResult = next.Call(iterator, {}).As<Napi::Object>();
                if(ToNativeValue<bool>(nextResult.Get("done"))){
                    break;
                }
                ret.push_back(
                    nextResult.Get("value")
                );
            }

            return ret;
        }
    };
}
