#include "SWFTexture.hpp"

namespace scNapi
{
    PROPERTY(
        SWFTexture,
        pixelFormat,
        parent->pixelFormat((sc::SWFTexture::PixelFormat)ToNativeValue<uint8_t>(value)),
        return ToJSValue(info, (uint8_t)parent->pixelFormat())
    );

    PROPERTY(
        SWFTexture,
        textureFilter,
        parent->textureFilter((sc::SWFTexture::Filter)ToNativeValue<uint8_t>(value)),
        return ToJSValue(info, (uint8_t)parent->pixelFormat())
    );

    PROPERTY(
        SWFTexture,
        linear,
        parent->linear(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->linear())
    );

    PROPERTY(
        SWFTexture,
        downscaling,
        parent->downscaling(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->downscaling())
    );

    PROPERTY(
        SWFTexture,
        width,
        parent->width(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->width())
    );

    PROPERTY(
        SWFTexture,
        height,
        parent->height(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->height())
    );

    PROPERTY(
        SWFTexture,
        data,
        parent->data = TypeConvertor<std::vector<uint8_t>>::ToNativeValue(value),
        return Napi::Buffer<uint8_t>::Copy(info.Env(), parent->data.data(), parent->data.size())
    );

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

    Napi::Value SWFTexture::rescaleTexture(const Napi::CallbackInfo& info)
    {
        SWFTexture* texture = SWFTexture::Unwrap(info[0].ToObject());

        uint16_t width = ToNativeValue<uint16_t>(info[1]);
        uint16_t height = ToNativeValue<uint16_t>(info[2]);

        std::vector<uint8_t> buffer = sc::SWFTexture::rescaleTexture(*(texture->get_parent()), width, height);

        return Napi::Buffer<uint8_t>::Copy(info.Env(), buffer.data(), buffer.size());
    }
}