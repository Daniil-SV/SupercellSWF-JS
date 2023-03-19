#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"

namespace scNapi
{
    class ColorTransform: public Napi::ObjectWrap<ColorTransform>, public LinkedObject<sc::ColorTransform>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        ColorTransform(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        void fromObject(Napi::Env, Napi::Object object) override
        {
            if (object.Has("alpha")){
                parent->alpha = ToNativeValue<float>(object.Get("alpha"));
            }

            if (object.Has("redAdd")){
                parent->redAdd = ToNativeValue<uint8_t>(object.Get("redAdd"));
            }
            if (object.Has("greenAdd")){
                parent->greenAdd = ToNativeValue<uint8_t>(object.Get("greenAdd"));
            }
            if (object.Has("blueAdd")){
                parent->blueAdd = ToNativeValue<uint8_t>(object.Get("blueAdd"));
            }
            if (object.Has("redMul")) {
                parent->redMul = ToNativeValue<float>(object.Get("redMul"));
            }
            if (object.Has("greenMul")) {
                parent->greenMul = ToNativeValue<float>(object.Get("greenMul"));
            }
            if (object.Has("blueMul")) {
                parent->blueMul = ToNativeValue<float>(object.Get("blueMul"));
            }
        }

    private:
        /* Red add */
        void set_RedAdd(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_RedAdd(const Napi::CallbackInfo& info);

        /* Greed add */
        void set_GreedAdd(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_GreedAdd(const Napi::CallbackInfo& info);

        /* Blue add */
        void set_BlueAdd(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_BlueAdd(const Napi::CallbackInfo& info);

        /* Alpha multiply */
        void set_Alpha(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Alpha(const Napi::CallbackInfo& info);

        /* Red multiply */
        void set_RedMul(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_RedMul(const Napi::CallbackInfo& info);

        /* Greed multiply */
        void set_GreedMul(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_GreedMul(const Napi::CallbackInfo& info);

        /* Blue multiply */
        void set_BlueMul(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_BlueMul(const Napi::CallbackInfo& info);

    };
}