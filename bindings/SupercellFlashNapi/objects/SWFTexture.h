#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"

#include "Utils/node_binding/stl.h"

namespace scNapi {
    class SWFTexture: public Napi::ObjectWrap<SWFTexture>, public LinkedObject<sc::SWFTexture>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        SWFTexture(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        void fromObject(Napi::Env, Napi::Object object) override
        {
            if (object.Has("textureFilter")) {
                parent->textureFilter((sc::SWFTexture::Filter)ToNativeValue<uint8_t>(object.Get("textureFilter")));
            }
            if (object.Has("pixelFormat")) {
                parent->pixelFormat((sc::SWFTexture::PixelFormat)ToNativeValue<uint8_t>(object.Get("pixelFormat")));
            }
            if (object.Has("linear")) {
                parent->linear(ToNativeValue<bool>(object.Get("linear")));
            }
            if (object.Has("width")) {
                parent->width(ToNativeValue<uint16_t>(object.Get("width")));
            }
            if (object.Has("height")) {
                parent->height(ToNativeValue<uint16_t>(object.Get("height")));
            }
            if (object.Has("data")) {
                parent->data = TypeConvertor<std::vector<uint8_t>>::ToNativeValue(object.Get("data"));
            }
        }

    private:
        /* 
        ~ Static methods
         */
        static Napi::Value getLinearData(const Napi::CallbackInfo& info);
        static Napi::Value getPixelFormatData(const Napi::CallbackInfo& info);

        /* 
        & Pixel format
         */

        void set_PixelFormat(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_PixelFormat(const Napi::CallbackInfo& info);


        /* 
        & TextureFilter
         */

        void set_TextureFilter(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_TextureFilter(const Napi::CallbackInfo& info);


        /* 
        & Width
         */

        void set_Width(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Width(const Napi::CallbackInfo& info);

        /* 
        & Height
         */

        void set_Height(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Height(const Napi::CallbackInfo& info);

        /* 
        & Downscaling
         */

        void set_Downscaling(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Downscaling(const Napi::CallbackInfo& info);

        /* 
        & Linear
         */

        void set_Linear(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Linear(const Napi::CallbackInfo& info);

        /* 
        & Data
         */

        void set_Data(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Data(const Napi::CallbackInfo& info);
    };
}
