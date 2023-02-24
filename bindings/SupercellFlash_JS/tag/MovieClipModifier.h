#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

#include "Utils/Utils.hpp"

namespace scNapi {
    class MovieClipModifier: public Napi::ObjectWrap<MovieClipModifier>, public ScObject<sc::MovieClipModifier>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        MovieClipModifier(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        sc::MovieClipModifier* get_parent() override
        {
            return parent;
        };

        void set_parent(sc::MovieClipModifier* item) override
        {
            parent = item;
        };

        void new_parent() override
        {
            parent = new sc::MovieClipModifier();
        }

        void fromObject(Napi::Env&, Napi::Object object) override
        {
            if (object.Has("type")) {
                parent->type((sc::MovieClipModifier::Type)ToNativeValue<uint8_t>(object.Get("type")));
            }
        }

    private:
        sc::MovieClipModifier* parent = nullptr; // Pointer to object that this class is attached to

        /* Type getter */
        void set_Type(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Type(const Napi::CallbackInfo& info);
    };
}