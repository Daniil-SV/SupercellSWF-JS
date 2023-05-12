#include "MovieClipFrame.hpp"

namespace scNapi {
    PROPERTY(
        MovieClipFrame,
        label,
        parent->label(ToNativeValue<string>(value)),
        return ToJSValue(info, parent->label())
    );

    PROPERTY(
        MovieClipFrame,
        elementsCount,
        parent->elementsCount(ToNativeValue<uint32_t>(value)),
        return ToJSValue(info, parent->elementsCount())
    );
}