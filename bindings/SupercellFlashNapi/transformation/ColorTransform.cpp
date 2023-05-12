#include "ColorTransform.hpp"

namespace scNapi {
    PROPERTY(
        ColorTransform,
        alpha,
        parent->alpha = ToNativeValue<float>(value),
        return ToJSValue(info, parent->alpha)
    );

    PROPERTY(
        ColorTransform,
        redAdd,
        parent->redAdd = ToNativeValue<uint8_t>(value),
        return ToJSValue(info, parent->redAdd)
    );

    PROPERTY(
        ColorTransform,
        greenAdd,
        parent->greenAdd = ToNativeValue<uint8_t>(value),
        return ToJSValue(info, parent->greenAdd)
    );

    PROPERTY(
        ColorTransform,
        blueAdd,
        parent->blueAdd = ToNativeValue<uint8_t>(value),
        return ToJSValue(info, parent->blueAdd)
    );

    PROPERTY(
        ColorTransform,
        redMul,
        parent->redMul = ToNativeValue<float>(value),
        return ToJSValue(info, parent->redMul)
    );

    PROPERTY(
        ColorTransform,
        greenMul,
        parent->greenMul = ToNativeValue<float>(value),
        return ToJSValue(info, parent->greenMul)
    );

    PROPERTY(
        ColorTransform,
        blueMul,
        parent->blueMul = ToNativeValue<float>(value),
        return ToJSValue(info, parent->blueMul)
    );
}