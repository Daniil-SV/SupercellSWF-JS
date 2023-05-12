#include "ExportName.hpp"

namespace scNapi
{
    PROPERTY(
        ExportName,
        id,
        parent->id(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->id())
    );

    PROPERTY(
        ExportName,
        name,
        parent->name(ToNativeValue<string>(value)),
        return ToJSValue(info, parent->name())
    );
}