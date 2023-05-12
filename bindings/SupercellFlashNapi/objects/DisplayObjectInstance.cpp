#include "DisplayObjectInstance.hpp"

namespace scNapi {
    PROPERTY(
        DisplayObjectInstance,
        id,
        parent->id = ToNativeValue<uint16_t>(value),
        return ToJSValue(info, parent->id)
    );

    PROPERTY(
        DisplayObjectInstance,
        blend,
        parent->blend = ToNativeValue<uint8_t>(value),
        return ToJSValue(info, parent->blend)
    );

    PROPERTY(
        DisplayObjectInstance,
        name,
        parent->name = ToNativeValue<string>(value),
        return ToJSValue(info, parent->name)
    );
}