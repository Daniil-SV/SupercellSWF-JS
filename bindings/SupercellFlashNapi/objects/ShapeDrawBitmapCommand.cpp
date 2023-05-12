#include "ShapeDrawBitmapCommand.hpp"

namespace scNapi {
    PROPERTY(
        ShapeDrawBitmapCommand,
        textureIndex,
        parent->textureIndex(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->textureIndex())
    );
}