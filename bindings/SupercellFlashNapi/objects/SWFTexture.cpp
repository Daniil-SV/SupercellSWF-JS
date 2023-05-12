#include "SWFTexture.hpp"

namespace scNapi {
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
}