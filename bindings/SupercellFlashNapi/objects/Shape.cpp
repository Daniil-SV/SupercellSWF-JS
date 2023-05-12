#include "Shape.hpp"

namespace scNapi {
    PROPERTY(
        Shape,
        id,
        parent->id(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->id())
    );
}