#include "SupercellSWF.hpp"

namespace scNapi {
    PROPERTY(
        SupercellSWF,
        useMultiResTexture,
        parent->useMultiResTexture(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->useMultiResTexture())
    );

    PROPERTY(
        SupercellSWF,
        useLowResTexture,
        parent->useLowResTexture(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->useLowResTexture())
    );

    PROPERTY(
        SupercellSWF,
        useExternalTexture,
        parent->useExternalTexture(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->useExternalTexture())
    );

    PROPERTY(
        SupercellSWF,
        multiResFileSuffix,
        parent->multiResFileSuffix(ToNativeValue<string>(value)),
        return ToJSValue(info, parent->multiResFileSuffix())
    );

    PROPERTY(
        SupercellSWF,
        lowResFileSuffix,
        parent->lowResFileSuffix(ToNativeValue<string>(value)),
        return ToJSValue(info, parent->lowResFileSuffix())
    );
}