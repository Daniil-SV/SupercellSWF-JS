#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"

namespace scNapi
{
    class TextField: public Napi::ObjectWrap<TextField>, public LinkedObject<sc::TextField>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        TextField(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        void fromObject(Napi::Env&, Napi::Object object) override
        {
            if (object.Has("id"))
            {
                parent->id(ToNativeValue<uint16_t>(object.Get("id")));
            }

            if (object.Has("text")){
                parent->text(ToNativeValue<std::string>(object.Get("text")));
            }

            if (object.Has("fontName")){
                parent->fontName(ToNativeValue<std::string>(object.Get("fontName")));
            }

            if (object.Has("fontSize")){
                parent->fontSize(ToNativeValue<uint8_t>(object.Get("fontSize")));
            }

            if (object.Has("fontColor")){
                parent->fontColor(ToNativeValue<int32_t>(object.Get("fontColor")));
            }

            if (object.Has("fontSize")){
                parent->fontSize(ToNativeValue<uint8_t>(object.Get("fontSize")));
            }

            if (object.Has("fontAlign")){
                parent->fontAlign(ToNativeValue<uint8_t>(object.Get("fontAlign")));
            }

            if (object.Has("left")){
                parent->left(ToNativeValue<uint16_t>(object.Get("left")));
            }

            if (object.Has("top")){
                parent->top(ToNativeValue<uint16_t>(object.Get("top")));
            }

            if (object.Has("right")){
                parent->right(ToNativeValue<uint16_t>(object.Get("right")));
            }

            if (object.Has("bottom")){
                parent->bottom(ToNativeValue<uint16_t>(object.Get("bottom")));
            }

            if (object.Has("isBold")){
                parent->isBold(ToNativeValue<bool>(object.Get("isBold")));
            }

            if (object.Has("isItalic")){
                parent->isItalic(ToNativeValue<bool>(object.Get("isItalic")));
            }

            if (object.Has("isMultiline")){
                parent->isMultiline(ToNativeValue<bool>(object.Get("isMultiline")));
            }

            if (object.Has("isOutlined")){
                parent->isOutlined(ToNativeValue<bool>(object.Get("isOutlined")));
            }

            if (object.Has("outlineColor")){
                parent->outlineColor(ToNativeValue<int32_t>(object.Get("outlineColor")));
            }

            if (object.Has("useDeviceFont")){
                parent->useDeviceFont(ToNativeValue<bool>(object.Get("useDeviceFont")));
            }

            if (object.Has("autoAdjustFontSize")){
                parent->autoAdjustFontSize(ToNativeValue<bool>(object.Get("autoAdjustFontSize")));
            }

            if (object.Has("unknownFlag")){
                parent->unknownFlag(ToNativeValue<bool>(object.Get("unknownFlag")));
            }

            if (object.Has("unknownShort")){
                parent->unknownShort(ToNativeValue<uint16_t>(object.Get("unknownShort")));
            }
        }

    private:
        /* 
        & Id
         */
        void set_id(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_id(const Napi::CallbackInfo& info);

        /* 
        & Text
         */

        void set_Text(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Text(const Napi::CallbackInfo& info);

        /* 
        & Font name
         */

        void set_FontName(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_FontName(const Napi::CallbackInfo& info);

        /* 
        & Font color
         */

        void set_FontColor(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_FontColor(const Napi::CallbackInfo& info);

        /* 
        & Font size
         */

        void set_FontSize(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_FontSize(const Napi::CallbackInfo& info);

        /* 
        & Font align
         */

        void set_FontAlign(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_FontAlign(const Napi::CallbackInfo& info);

        /* 
        & Left
         */

        void set_Left(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Left(const Napi::CallbackInfo& info);

        /* 
        & Top
         */

        void set_Top(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Top(const Napi::CallbackInfo& info);

        /* 
        & Right
         */

        void set_Right(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Right(const Napi::CallbackInfo& info);

        /* 
        & Bottom
         */

        void set_Bottom(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Bottom(const Napi::CallbackInfo& info);

        /* 
        & IsBold
         */

        void set_IsBold(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_IsBold(const Napi::CallbackInfo& info);

        /* 
        & IsItalic
         */

        void set_IsItalic(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_IsItalic(const Napi::CallbackInfo& info);

        /* 
        & IsMultiline
         */

        void set_IsMultiline(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_IsMultiline(const Napi::CallbackInfo& info);

        /* 
        & IsOutlined
         */

        void set_IsOutlined(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_IsOutlined(const Napi::CallbackInfo& info);

         /* 
        & Outline color
         */

        void set_OutlineColor(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_OutlineColor(const Napi::CallbackInfo& info);


        /* 
        & UseDeviceFont
         */

        void set_UseDeviceFont(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_UseDeviceFont(const Napi::CallbackInfo& info);
        
        /* 
        & AdjustFontBounds
         */

        void set_AutoAdjustFontSize(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_AutoAdjustFontSize(const Napi::CallbackInfo& info);

        /* 
        & unknownFlag
         */

        void set_UnknownFlag(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_UnknownFlag(const Napi::CallbackInfo& info);

        /* 
        & unknownShort
         */

        void set_UnknownShort(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_UnknownShort(const Napi::CallbackInfo& info);
    };
}