#pragma once

#include <napi.h>
#include "LinkedObject.h"
#include "Vector.h"

#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

namespace scNapi
{
    struct Utils
    {
        static void throwException(Napi::Env env, const std::string message)
        {
            Napi::Error::New(env, message).ThrowAsJavaScriptException();
        }

        template <class T>
        static void initializeClass(LinkedObject<T>* context, const Napi::CallbackInfo& info)
        {
            Napi::Env env = info.Env();
            if (info[0].IsObject())
            {
                context->new_parent();
                context->fromObject(env, info[0].ToObject());
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
                if (ToNativeValue<bool>(nextResult.Get("done")))
                {
                    break;
                }
                ret.push_back(
                    nextResult.Get("value")
                );
            }

            return ret;
        }

        static std::string getPath(Napi::Env env, Napi::Value path, bool mustExist)
        {
            std::string filepath = ToNativeValue<std::string>(path);
            fs::path absPath = fs::absolute(filepath);

            if (mustExist)
            {
                if (fs::exists(absPath))
                {
                    return absPath.string();
                }
                else
                {
                    Utils::throwException(env, "File not exist: " + filepath);
                    return "";
                }
            } else {
                return absPath.string();
            }
        }
    };
}
