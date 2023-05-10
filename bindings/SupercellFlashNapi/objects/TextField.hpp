#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/node_binding/stl.h"
#include "Utils/LinkedObject.h"
#include "Utils/Macros.h"

using namespace std;

namespace scNapi
{
    class TextField: public Napi::ObjectWrap<TextField>, public LinkedObject<sc::TextField>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "TextField",
                    {
                        PROPERTY_ACCESSOR(scNapi::TextField, id),
                        PROPERTY_ACCESSOR(scNapi::TextField, text),
                        PROPERTY_ACCESSOR(scNapi::TextField, fontName),
                        PROPERTY_ACCESSOR(scNapi::TextField, fontColor),
                        PROPERTY_ACCESSOR(scNapi::TextField, fontSize),
                        PROPERTY_ACCESSOR(scNapi::TextField, fontAlign),
                        PROPERTY_ACCESSOR(scNapi::TextField, left),
                        PROPERTY_ACCESSOR(scNapi::TextField, top),
                        PROPERTY_ACCESSOR(scNapi::TextField, right),
                        PROPERTY_ACCESSOR(scNapi::TextField, bottom),
                        PROPERTY_ACCESSOR(scNapi::TextField, isBold),
                        PROPERTY_ACCESSOR(scNapi::TextField, isItalic),
                        PROPERTY_ACCESSOR(scNapi::TextField, isMultiline),
                        PROPERTY_ACCESSOR(scNapi::TextField, isOutlined),
                        PROPERTY_ACCESSOR(scNapi::TextField, isDynamic),
                        PROPERTY_ACCESSOR(scNapi::TextField, outlineColor),
                        PROPERTY_ACCESSOR(scNapi::TextField, useDeviceFont),
                        PROPERTY_ACCESSOR(scNapi::TextField, autoAdjustFontSize),
                        PROPERTY_ACCESSOR(scNapi::TextField, unknownFlag),
                        PROPERTY_ACCESSOR(scNapi::TextField, unknownShort),
                        PROPERTY_ACCESSOR(scNapi::TextField, unknownShort2)
                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("TextField", func);
        }

        TextField(const Napi::CallbackInfo& info): Napi::ObjectWrap<TextField>(info)
        {
            INITIALIZER(TextField);
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object) override
        {
            PROPERTY_INIT(id);
            PROPERTY_INIT(text);
            PROPERTY_INIT(fontName);
            PROPERTY_INIT(fontColor);
            PROPERTY_INIT(fontSize);
            PROPERTY_INIT(fontAlign);
            PROPERTY_INIT(left);
            PROPERTY_INIT(top);
            PROPERTY_INIT(right);
            PROPERTY_INIT(bottom);
            PROPERTY_INIT(isBold);
            PROPERTY_INIT(isItalic);
            PROPERTY_INIT(isMultiline);
            PROPERTY_INIT(isOutlined);
            PROPERTY_INIT(isDynamic);
            PROPERTY_INIT(outlineColor);
            PROPERTY_INIT(useDeviceFont);
            PROPERTY_INIT(autoAdjustFontSize);
            PROPERTY_INIT(unknownFlag);
            PROPERTY_INIT(unknownShort);
            PROPERTY_INIT(unknownShort2);
        }

    private:
        PROPERTY(id)
            parent->id(ToNativeValue<uint16_t>(value));
        PROPERTY_GET(id)
            return ToJSValue(info, parent->id());
        PROPERTY_END


        PROPERTY(text)
            parent->text(ToNativeValue<string>(value));
        PROPERTY_GET(text)
            return ToJSValue(info, parent->text());
        PROPERTY_END


        PROPERTY(fontName)
            parent->fontName(ToNativeValue<string>(value));
        PROPERTY_GET(fontName)
            return ToJSValue(info, parent->fontName());
        PROPERTY_END


        PROPERTY(fontColor)
            parent->fontColor(ToNativeValue<uint32_t>(value));
        PROPERTY_GET(fontColor)
            return ToJSValue(info, parent->fontColor());
        PROPERTY_END


        PROPERTY(fontSize)
            parent->fontSize(ToNativeValue<uint32_t>(value));
        PROPERTY_GET(fontSize)
            return ToJSValue(info, parent->fontSize());
        PROPERTY_END


        PROPERTY(fontAlign)
            parent->fontAlign((sc::TextField::Align)ToNativeValue<uint8_t>(value));
        PROPERTY_GET(fontAlign)
            return ToJSValue(info, (uint8_t)parent->fontAlign());
        PROPERTY_END
        

        PROPERTY(left)
            parent->left(ToNativeValue<uint16_t>(value));
        PROPERTY_GET(left)
            return ToJSValue(info, parent->left());
        PROPERTY_END


        PROPERTY(top)
            parent->top(ToNativeValue<uint16_t>(value));
        PROPERTY_GET(top)
            return ToJSValue(info, parent->top());
        PROPERTY_END


        PROPERTY(right)
            parent->right(ToNativeValue<uint16_t>(value));
        PROPERTY_GET(right)
            return ToJSValue(info, parent->right());
        PROPERTY_END


        PROPERTY(bottom)
            parent->bottom(ToNativeValue<uint16_t>(value));
        PROPERTY_GET(bottom)
            return ToJSValue(info, parent->bottom());
        PROPERTY_END


        PROPERTY(isBold)
            parent->isBold(ToNativeValue<bool>(value));
        PROPERTY_GET(isBold)
            return ToJSValue(info, parent->isBold());
        PROPERTY_END


        PROPERTY(isItalic)
            parent->isItalic(ToNativeValue<bool>(value));
        PROPERTY_GET(isItalic)
            return ToJSValue(info, parent->isItalic());
        PROPERTY_END


        PROPERTY(isMultiline)
            parent->isMultiline(ToNativeValue<bool>(value));
        PROPERTY_GET(isMultiline)
            return ToJSValue(info, parent->isMultiline());
        PROPERTY_END


        PROPERTY(isOutlined)
            parent->isOutlined(ToNativeValue<bool>(value));
        PROPERTY_GET(isOutlined)
            return ToJSValue(info, parent->isOutlined());
        PROPERTY_END


        PROPERTY(isDynamic)
            parent->isDynamic(ToNativeValue<bool>(value));
        PROPERTY_GET(isDynamic)
            return ToJSValue(info, parent->isDynamic());
        PROPERTY_END


        PROPERTY(outlineColor)
            parent->outlineColor(ToNativeValue<uint32_t>(value));
        PROPERTY_GET(outlineColor)
            return ToJSValue(info, parent->outlineColor());
        PROPERTY_END


        PROPERTY(useDeviceFont)
            parent->useDeviceFont(ToNativeValue<bool>(value));
        PROPERTY_GET(useDeviceFont)
            return ToJSValue(info, parent->useDeviceFont());
        PROPERTY_END


         PROPERTY(autoAdjustFontSize)
            parent->autoAdjustFontSize(ToNativeValue<bool>(value));
        PROPERTY_GET(autoAdjustFontSize)
            return ToJSValue(info, parent->autoAdjustFontSize());
        PROPERTY_END


        PROPERTY(unknownFlag)
            parent->unknownFlag(ToNativeValue<bool>(value));
        PROPERTY_GET(unknownFlag)
            return ToJSValue(info, parent->unknownFlag());
        PROPERTY_END


         PROPERTY(unknownShort)
            parent->unknownShort(ToNativeValue<uint16_t>(value));
        PROPERTY_GET(unknownShort)
            return ToJSValue(info, parent->unknownShort());
        PROPERTY_END


        PROPERTY(unknownShort2)
            parent->unknownShort2(ToNativeValue<uint16_t>(value));
        PROPERTY_GET(unknownShort2)
            return ToJSValue(info, parent->unknownShort2());
        PROPERTY_END
    };
}