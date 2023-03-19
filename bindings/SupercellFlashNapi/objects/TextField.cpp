#include "TextField.h"

namespace scNapi
{
    void TextField::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "TextField",
                {
                    InstanceAccessor("id", &TextField::get_id, &TextField::set_id),

                    InstanceAccessor("text", &TextField::get_Text, &TextField::set_Text),

                    InstanceAccessor("fontName", &TextField::get_FontName, &TextField::set_FontName),
                    InstanceAccessor("fontColor", &TextField::get_FontColor, &TextField::set_FontColor),
                    InstanceAccessor("fontSize", &TextField::get_FontSize, &TextField::set_FontSize),
                    InstanceAccessor("fontAlign", &TextField::get_FontAlign, &TextField::set_FontAlign),

                    InstanceAccessor("left", &TextField::get_Left, &TextField::set_Left),
                    InstanceAccessor("top", &TextField::get_Top, &TextField::set_Top),
                    InstanceAccessor("right", &TextField::get_Right, &TextField::set_Right),
                    InstanceAccessor("bottom", &TextField::get_Bottom, &TextField::set_Bottom),

                    InstanceAccessor("isBold", &TextField::get_IsBold, &TextField::set_IsBold),
                    InstanceAccessor("isItalic", &TextField::get_IsItalic, &TextField::set_IsItalic),
                    InstanceAccessor("isMultiline", &TextField::get_IsMultiline, &TextField::set_IsMultiline),
                    InstanceAccessor("isOutlined", &TextField::get_IsOutlined, &TextField::set_IsOutlined),

                    InstanceAccessor("outlineColor", &TextField::get_OutlineColor, &TextField::set_OutlineColor),
                    InstanceAccessor("useDeviceFont", &TextField::get_UseDeviceFont, &TextField::set_UseDeviceFont),
                    InstanceAccessor("autoAdjustFontSize", &TextField::get_AutoAdjustFontSize, &TextField::set_AutoAdjustFontSize)
                });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("TextField", func);
    }

    Napi::FunctionReference TextField::constructor;
    TextField::TextField(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<TextField>(info)
    {
        Utils::initializeClass<sc::TextField>(this, info);
    };

    /* 
    & Id
    */

    void TextField::set_id(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->id(ToNativeValue<uint16_t>(value));
    }
    Napi::Value TextField::get_id(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->id());
    }

    /*
    & Text
    */

    void TextField::set_Text(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->text(ToNativeValue<std::string>(value));
    }
    Napi::Value TextField::get_Text(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->text());
    }

    /*
    & Font name
     */

    void TextField::set_FontName(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->fontName(ToNativeValue<std::string>(value));
    }
    Napi::Value TextField::get_FontName(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->fontName());
    }

    /*
    & Font color
     */

    void TextField::set_FontColor(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->fontColor(ToNativeValue<uint32_t>(value));
    }
    Napi::Value TextField::get_FontColor(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->fontColor());
    }

    /*
    & Font size
     */

    void TextField::set_FontSize(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->fontSize(ToNativeValue<uint8_t>(value));
    }
    Napi::Value TextField::get_FontSize(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->fontSize());
    }

    /*
    & Font align
     */

    void TextField::set_FontAlign(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->fontAlign(ToNativeValue<uint8_t>(value));
    }
    Napi::Value TextField::get_FontAlign(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->fontAlign());
    }

    /*
    & Left
     */

    void TextField::set_Left(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->left(ToNativeValue<uint16_t>(value));
    }
    Napi::Value TextField::get_Left(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->left());
    }

    /*
    & Top
     */

    void TextField::set_Top(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->top(ToNativeValue<uint16_t>(value));
    }
    Napi::Value TextField::get_Top(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->top());
    }

    /*
    & Right
     */

    void TextField::set_Right(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->right(ToNativeValue<uint16_t>(value));
    }
    Napi::Value TextField::get_Right(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->right());
    }

    /*
    & Bottom
     */

    void TextField::set_Bottom(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->bottom(ToNativeValue<uint16_t>(value));
    }
    Napi::Value TextField::get_Bottom(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->bottom());
    }

    /*
    & IsBold
     */

    void TextField::set_IsBold(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->isBold(ToNativeValue<bool>(value));
    }
    Napi::Value TextField::get_IsBold(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->isBold());
    }

    /*
    & IsItalic
     */

    void TextField::set_IsItalic(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->isItalic(ToNativeValue<bool>(value));
    }
    Napi::Value TextField::get_IsItalic(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->isItalic());
    }

    /*
    & IsMultiline
     */

    void TextField::set_IsMultiline(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->isMultiline(ToNativeValue<bool>(value));
    }
    Napi::Value TextField::get_IsMultiline(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->isMultiline());
    }

    /*
    & IsOutlined
     */

    void TextField::set_IsOutlined(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->isOutlined(ToNativeValue<bool>(value));
    }
    Napi::Value TextField::get_IsOutlined(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->isOutlined());
    }

    /*
    & IsDynamic
     */

    void TextField::set_IsDynamic(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->isDynamic(ToNativeValue<bool>(value));
    }
    Napi::Value TextField::get_IsDynamic(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->isDynamic());
    }

    /*
    & UseDeviceFont
     */

    void TextField::set_OutlineColor(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->outlineColor(ToNativeValue<uint32_t>(value));
    }
    Napi::Value TextField::get_OutlineColor(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->outlineColor());
    }

    /*
    & UseDeviceFont
     */

    void TextField::set_UseDeviceFont(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->useDeviceFont(ToNativeValue<bool>(value));
    }
    Napi::Value TextField::get_UseDeviceFont(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->useDeviceFont());
    }

    /*
    & AdjustFontBounds
     */

    void TextField::set_AutoAdjustFontSize(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->autoAdjustFontSize(ToNativeValue<bool>(value));
    }
    Napi::Value TextField::get_AutoAdjustFontSize(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->autoAdjustFontSize());
    }

    /*
    & unknownFlag
     */

    void TextField::set_UnknownFlag(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->unknownFlag(ToNativeValue<bool>(value));
    }
    Napi::Value TextField::get_UnknownFlag(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->unknownFlag());
    }

    /*
    & unknownShort
     */

    void TextField::set_UnknownShort(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->unknownShort(ToNativeValue<uint16_t>(value));
    }
    Napi::Value TextField::get_UnknownShort(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->unknownShort());
    }

}