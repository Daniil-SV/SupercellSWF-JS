#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/node_binding/stl.h"
#include "Utils/LinkedObject.h"
#include "Utils/Macros.h"

namespace scNapi
{
    class SWFTexture: public Napi::ObjectWrap<SWFTexture>, public LinkedObject<sc::SWFTexture>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "SWFTexture",
                    {
                        StaticMethod("getPixelFormatData", &SWFTexture::getPixelFormatData),
                        StaticMethod("getLinearData", &SWFTexture::getLinearData),
                        StaticMethod("rescaleTexture", &SWFTexture::rescaleTexture),
                        PROPERTY_ACCESSOR(scNapi::SWFTexture, pixelFormat),
                        PROPERTY_ACCESSOR(scNapi::SWFTexture, textureFilter),
                        PROPERTY_ACCESSOR(scNapi::SWFTexture, linear),
                        PROPERTY_ACCESSOR(scNapi::SWFTexture, downscaling),
                        PROPERTY_ACCESSOR(scNapi::SWFTexture, width),
                        PROPERTY_ACCESSOR(scNapi::SWFTexture, height),
                        PROPERTY_ACCESSOR(scNapi::SWFTexture, data)
                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("SWFTexture", func);
        }

        SWFTexture(const Napi::CallbackInfo& info): Napi::ObjectWrap<SWFTexture>(info)
        {
            INITIALIZER(SWFTexture);
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object) override
        {
            PROPERTY_INIT(linear);
            PROPERTY_INIT(downscaling);
            PROPERTY_INIT(width);
            PROPERTY_INIT(height);
            PROPERTY_INIT(data);
            PROPERTY_INIT(pixelFormat);
            PROPERTY_INIT(textureFilter);
        }

    private:
        PROPERTY_DEF(pixelFormat);
        PROPERTY_DEF(textureFilter);

        PROPERTY_DEF(linear);
        PROPERTY_DEF(downscaling);

        PROPERTY_DEF(width);
        PROPERTY_DEF(height);
        PROPERTY_DEF(data);
    
        static Napi::Value getLinearData(const Napi::CallbackInfo&);
        static Napi::Value getPixelFormatData(const Napi::CallbackInfo&);
        static Napi::Value rescaleTexture(const Napi::CallbackInfo&);
    };
}