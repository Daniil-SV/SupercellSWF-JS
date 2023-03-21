#include "SWFTexture.h"

namespace scNapi
{
    void SWFTexture::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "SWFTexture",
                {
                    StaticMethod("processLinearData", &SWFTexture::processLinearData),

                    InstanceAccessor("pixelFormat", &SWFTexture::get_PixelFormat, &SWFTexture::set_PixelFormat),

                    InstanceAccessor("magFilter", &SWFTexture::get_MagFilter, &SWFTexture::set_MagFilter),
                    InstanceAccessor("minFilter", &SWFTexture::get_MinFilter, &SWFTexture::set_MinFilter),

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
    Napi::Value SWFTexture::processLinearData(const Napi::CallbackInfo& info) {
        SWFTexture* texture = SWFTexture::Unwrap(info[0].ToObject());
        bool toLinear = ToNativeValue<bool>(info[1]);

        std::vector<uint8_t> buffer = sc::SWFTexture::processLinearData(*(texture->get_parent()), toLinear);

        return Napi::Buffer<uint8_t>::Copy(info.Env(), buffer.data(), buffer.size());
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
    & MagFilter
     */

    void SWFTexture::set_MagFilter(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->magFilter((sc::SWFTexture::Filter)ToNativeValue<uint8_t>(info[0]));
    }
    Napi::Value SWFTexture::get_MagFilter(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->magFilter());
    }

    /*
    & MinFilter
     */

    void SWFTexture::set_MinFilter(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->minFilter((sc::SWFTexture::Filter)ToNativeValue<uint8_t>(info[0]));
    }
    Napi::Value SWFTexture::get_MinFilter(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->minFilter());
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
        Napi::Buffer<uint8_t> buffer = info[0].As<Napi::Buffer<uint8_t>>();
        uint32_t destinationLength = (parent->width() * parent->height()) * parent->pixelByteSize();
        if (buffer.Length() != destinationLength)
        {
            Napi::Error::New(info.Env(), "Texture buffer length different from target length").ThrowAsJavaScriptException();
        }

        parent->data = std::vector<uint8_t>(buffer.Length());
        memcpy(parent->data.data(), buffer.Data(), buffer.Length());

    }
    Napi::Value SWFTexture::get_Data(const Napi::CallbackInfo& info)
    {
        return Napi::Buffer<uint8_t>::Copy(info.Env(), parent->data.data(), parent->data.size());
    }
}
