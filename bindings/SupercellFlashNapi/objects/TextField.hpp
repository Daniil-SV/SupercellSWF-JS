#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/node_binding/stl.h"
#include "Utils/LinkedObject.h"
#include "Utils/Macros.h"

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
                        PROPERTY_ACCESSOR(id),
                        PROPERTY_ACCESSOR(text),
                        PROPERTY_ACCESSOR(fontName),
                        PROPERTY_ACCESSOR(fontColor),
                        PROPERTY_ACCESSOR(fontSize),
                        PROPERTY_ACCESSOR(fontAlign),
                        PROPERTY_ACCESSOR(left),
                        PROPERTY_ACCESSOR(top),
                        PROPERTY_ACCESSOR(right),
                        PROPERTY_ACCESSOR(bottom),
                        PROPERTY_ACCESSOR(isBold),
                        PROPERTY_ACCESSOR(isItalic),
                        PROPERTY_ACCESSOR(isMultiline),
                        PROPERTY_ACCESSOR(isOutlined),
                        PROPERTY_ACCESSOR(isDynamic),
                        PROPERTY_ACCESSOR(outlineColor),
                        PROPERTY_ACCESSOR(useDeviceFont),
                        PROPERTY_ACCESSOR(autoAdjustFontSize),
                        PROPERTY_ACCESSOR(unknownFlag),
                        PROPERTY_ACCESSOR(unknownShort),
                        PROPERTY_ACCESSOR(unknownShort2)
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
        PROPERTY(id, uint16_t);
        PROPERTY(text, std::string);
        PROPERTY(fontName, std::string);
        PROPERTY(fontColor, uint32_t);
        PROPERTY(fontSize, uint32_t);
        ENUMERATE(fontAlign, uint8_t, sc::TextField::Align);
        PROPERTY(left, uint16_t);
        PROPERTY(top, uint16_t);
        PROPERTY(right, uint16_t);
        PROPERTY(bottom, uint16_t);
        PROPERTY(isBold, bool);
        PROPERTY(isItalic, bool);
        PROPERTY(isMultiline, bool);
        PROPERTY(isOutlined, bool);
        PROPERTY(isDynamic, bool);
        PROPERTY(outlineColor, uint32_t);
        PROPERTY(useDeviceFont, bool);
        PROPERTY(autoAdjustFontSize, bool);
        PROPERTY(unknownFlag, bool);
        PROPERTY(unknownShort, uint16_t);
        PROPERTY(unknownShort2, uint16_t);
    };
}