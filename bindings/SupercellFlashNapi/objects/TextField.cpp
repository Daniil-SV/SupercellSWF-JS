#include "TextField.hpp"

namespace scNapi {
    PROPERTY(
        TextField,
        id,
        parent->id(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->id())
    );

    PROPERTY(
        TextField,
        text,
        parent->text(ToNativeValue<string>(value)),
        return ToJSValue(info, parent->text())
    );

    PROPERTY(
        TextField,
        fontName,
        parent->fontName(ToNativeValue<string>(value)),
        return ToJSValue(info, parent->fontName())
    );

    PROPERTY(
        TextField,
        fontColor,
        parent->fontColor(ToNativeValue<uint32_t>(value)),
        return ToJSValue(info, parent->fontColor())
    );

    PROPERTY(
        TextField,
        fontSize,
        parent->fontSize(ToNativeValue<uint32_t>(value)),
        return ToJSValue(info, parent->fontSize())
    );

    PROPERTY(
        TextField,
        fontAlign,
        parent->fontAlign((sc::TextField::Align)ToNativeValue<uint8_t>(value)),
        return ToJSValue(info, (uint8_t)parent->fontAlign())
    );

    PROPERTY(
        TextField,
        left,
        parent->left(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->left())
    );

    PROPERTY(
        TextField,
        top,
        parent->top(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->top())
    );

    PROPERTY(
        TextField,
        right,
        parent->right(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->right())
    );

    PROPERTY(
        TextField,
        bottom,
        parent->bottom(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->bottom())
    );

    PROPERTY(
        TextField,
        isBold,
        parent->isBold(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->isBold())
    );

    PROPERTY(
        TextField,
        isItalic,
        parent->isItalic(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->isItalic())
    );

    PROPERTY(
        TextField,
        isMultiline,
        parent->isMultiline(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->isMultiline())
    );

    PROPERTY(
        TextField,
        isOutlined,
        parent->isOutlined(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->isOutlined())
    );

    PROPERTY(
        TextField,
        isDynamic,
        parent->isDynamic(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->isDynamic())
    );

    PROPERTY(
        TextField,
        outlineColor,
        parent->outlineColor(ToNativeValue<uint32_t>(value)),
        return ToJSValue(info, parent->outlineColor())
    );

    PROPERTY(
        TextField,
        useDeviceFont,
        parent->useDeviceFont(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->useDeviceFont())
    );

    PROPERTY(
        TextField,
        autoAdjustFontSize,
        parent->autoAdjustFontSize(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->autoAdjustFontSize())
    );

    PROPERTY(
        TextField,
        unknownFlag,
        parent->unknownFlag(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->unknownFlag())
    );

    PROPERTY(
        TextField,
        unknownShort,
        parent->unknownShort(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->unknownShort())
    );

    PROPERTY(
        TextField,
        unknownShort2,
        parent->unknownShort2(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->unknownShort2())
    );
}