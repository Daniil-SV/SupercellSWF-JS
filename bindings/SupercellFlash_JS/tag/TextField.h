#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

#include "Utils/Utils.hpp"

namespace scNapi
{
    class TextField: public Napi::ObjectWrap<TextField>, public ScObject<sc::TextField>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        TextField(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        sc::TextField* get_parent() override
        {
            return parent;
        };

        void set_parent(sc::TextField* item) override
        {
            parent = item;
        };

        void new_parent() override
        {
            parent = new sc::TextField();
        }

        void fromObject(Napi::Object object) override
        {
            // TODO
        }

    private:
        sc::TextField* parent = nullptr; // Pointer to object that this class is attached to
        
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
        & UseDeviceFont
         */

        void set_UseDeviceFont(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_UseDeviceFont(const Napi::CallbackInfo& info);

        /* 
        & AdjustFontBounds
         */

        void set_AdjustFontBounds(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_AdjustFontBounds(const Napi::CallbackInfo& info);
    };
}