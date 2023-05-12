#include "MovieClipFrameElement.hpp"

namespace scNapi {
    PROPERTY(
        MovieClipFrameElement,
        instanceIndex,
        parent->instanceIndex = ToNativeValue<uint16_t>(value),
        return ToJSValue(info, parent->instanceIndex)
    );

    PROPERTY(
        MovieClipFrameElement,
        matrixIndex,
        parent->matrixIndex = ToNativeValue<uint16_t>(value),
        return ToJSValue(info, parent->matrixIndex)
    );

    PROPERTY(
        MovieClipFrameElement,
        colorTransformIndex,
        parent->colorTransformIndex = ToNativeValue<uint16_t>(value),
        return ToJSValue(info, parent->colorTransformIndex)
    );
}