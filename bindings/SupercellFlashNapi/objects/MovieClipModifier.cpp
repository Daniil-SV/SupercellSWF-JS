#include "MovieClipModifier.hpp"

namespace scNapi {
    PROPERTY(
        MovieClipModifier,
        id,
        parent->id(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->id())
    );

    PROPERTY(
        MovieClipModifier,
        type,
        parent->type((sc::MovieClipModifier::Type)ToNativeValue<uint8_t>(value)),
        return ToJSValue(info, (uint8_t)parent->type())
    );
}