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
                        PROPERTY_ACCESSOR(pixelFormat),
                        PROPERTY_ACCESSOR(textureFilter),
                        PROPERTY_ACCESSOR(linear),
                        PROPERTY_ACCESSOR(downscaling),
                        PROPERTY_ACCESSOR(width),
                        PROPERTY_ACCESSOR(height),
                        PROPERTY_ACCESSOR(data)
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
        ENUMERATE(pixelFormat, uint8_t, sc::SWFTexture::PixelFormat);
        ENUMERATE(textureFilter, uint8_t, sc::SWFTexture::Filter);
        PROPERTY(linear, bool);
        PROPERTY(downscaling, bool);
        PROPERTY(width, uint16_t);
        PROPERTY(height, uint16_t);

        static Napi::Value getLinearData(const Napi::CallbackInfo& info)
        {
            SWFTexture* texture = SWFTexture::Unwrap(info[0].ToObject());
            bool toLinear = ToNativeValue<bool>(info[1]);

            std::vector<uint8_t> buffer = sc::SWFTexture::getLinearData(*(texture->get_parent()), toLinear);

            return Napi::Buffer<uint8_t>::Copy(info.Env(), buffer.data(), buffer.size());
        }

        static Napi::Value getPixelFormatData(const Napi::CallbackInfo& info)
        {
            std::vector<uint8_t> buffer;
            if (info[0].IsBuffer())
            {
                std::vector<uint8_t> imageData = TypeConvertor<std::vector<uint8_t>>::ToNativeValue(info[0]);
                uint16_t width = ToNativeValue<uint16_t>(info[1]);
                uint16_t heigt = ToNativeValue<uint16_t>(info[2]);
                uint8_t srcType = ToNativeValue<uint8_t>(info[3]);
                uint8_t dstType = ToNativeValue<uint8_t>(info[4]);

                buffer = sc::SWFTexture::getPixelFormatData(imageData.data(), width, heigt, (sc::SWFTexture::PixelFormat)srcType, (sc::SWFTexture::PixelFormat)dstType);
            }
            else
            {
                sc::SWFTexture* texture = scNapi::SWFTexture::Unwrap(
                    info[0].As<Napi::Object>()
                )->get_parent();
                uint8_t dstType = ToNativeValue<uint8_t>(info[1]);

                buffer = sc::SWFTexture::getPixelFormatData(*texture, (sc::SWFTexture::PixelFormat)dstType);
            }

            return TypeConvertor<std::vector<uint8_t>>::ToJSBuffer(info, buffer);
        }

        static Napi::Value rescaleTexture(const Napi::CallbackInfo& info)
        {
            SWFTexture* texture = SWFTexture::Unwrap(info[0].ToObject());
            
            uint16_t width = ToNativeValue<uint16_t>(info[1]);
            uint16_t height = ToNativeValue<uint16_t>(info[2]);

            std::vector<uint8_t> buffer = sc::SWFTexture::rescaleTexture(*(texture->get_parent()), width, height);

            return Napi::Buffer<uint8_t>::Copy(info.Env(), buffer.data(), buffer.size());
        }

        void set_data(const Napi::CallbackInfo& info, const Napi::Value& value)
        {
            parent->data = TypeConvertor<std::vector<uint8_t>>::ToNativeValue(value);
        }
        Napi::Value get_data(const Napi::CallbackInfo& info)
        {
            return Napi::Buffer<uint8_t>::Copy(info.Env(), parent->data.data(), parent->data.size());
        }
    };
}