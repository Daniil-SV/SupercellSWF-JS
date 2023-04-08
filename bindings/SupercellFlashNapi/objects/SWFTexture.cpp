#include "SWFTexture.h"

namespace scNapi
{
    void SWFTexture::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "SWFTexture",
                {
                    StaticMethod("getPixelFormatData", &SWFTexture::getPixelFormatData),
                    StaticMethod("getLinearData", &SWFTexture::getLinearData),

                    InstanceAccessor("pixelFormat", &SWFTexture::get_PixelFormat, &SWFTexture::set_PixelFormat),
                    InstanceAccessor("textureFilter", &SWFTexture::get_TextureFilter, &SWFTexture::set_TextureFilter),

                    InstanceAccessor("width", &SWFTexture::get_Width, &SWFTexture::set_Width),
                    InstanceAccessor("height", &SWFTexture::get_Height, &SWFTexture::set_Height),

                    InstanceAccessor("downscaling", &SWFTexture::get_Downscaling, &SWFTexture::set_Downscaling),
                    InstanceAccessor("linear", &SWFTexture::get_Linear, &SWFTexture::set_Linear),

                    InstanceAccessor("data", &SWFTexture::get_Data, &SWFTexture::set_Data)
                });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("SWFTexture", func);
    }

    Napi::FunctionReference SWFTexture::constructor;
    SWFTexture::SWFTexture(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<SWFTexture>(info)
    {
        Utils::initializeClass<sc::SWFTexture>(this, info);
    };

    /*
    ~ Static
     */
    Napi::Value SWFTexture::getLinearData(const Napi::CallbackInfo& info)
    {
        SWFTexture* texture = SWFTexture::Unwrap(info[0].ToObject());
        bool toLinear = ToNativeValue<bool>(info[1]);

        std::vector<uint8_t> buffer = sc::SWFTexture::getLinearData(*(texture->get_parent()), toLinear);

        return Napi::Buffer<uint8_t>::Copy(info.Env(), buffer.data(), buffer.size());
    }

    Napi::Value SWFTexture::getPixelFormatData(const Napi::CallbackInfo& info)
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

    /*
    & Pixel format
     */

    void SWFTexture::set_PixelFormat(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->pixelFormat((sc::SWFTexture::PixelFormat)ToNativeValue<uint8_t>(info[0]));
    }
    Napi::Value SWFTexture::get_PixelFormat(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, (uint8_t)parent->pixelFormat());
    }


    /*
    & TextureFilter
     */

    void SWFTexture::set_TextureFilter(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->textureFilter((sc::SWFTexture::Filter)ToNativeValue<uint8_t>(info[0]));
    }
    Napi::Value SWFTexture::get_TextureFilter(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->textureFilter());
    }

    /*
    & Width
     */

    void SWFTexture::set_Width(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->width(ToNativeValue<uint16_t>(info[0]));
    }
    Napi::Value SWFTexture::get_Width(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->width());
    }

    /*
    & Height
     */

    void SWFTexture::set_Height(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->height(ToNativeValue<uint16_t>(info[0]));
    }
    Napi::Value SWFTexture::get_Height(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->height());
    }

    /*
    & Downscaling
     */

    void SWFTexture::set_Downscaling(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->downscaling(ToNativeValue<bool>(info[0]));
    }
    Napi::Value SWFTexture::get_Downscaling(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->downscaling());
    }

    /*
    & Linear
     */

    void SWFTexture::set_Linear(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->linear(ToNativeValue<bool>(info[0]));
    }
    Napi::Value SWFTexture::get_Linear(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->linear());
    }

    /*
    & Data
     */

    void SWFTexture::set_Data(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->data = TypeConvertor<std::vector<uint8_t>>::ToNativeValue(value);

    }
    Napi::Value SWFTexture::get_Data(const Napi::CallbackInfo& info)
    {
        return Napi::Buffer<uint8_t>::Copy(info.Env(), parent->data.data(), parent->data.size());
    }
}
