#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"

namespace scNapi {
    class MovieClipModifier: public Napi::ObjectWrap<MovieClipModifier>, public LinkedObject<sc::MovieClipModifier>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        MovieClipModifier(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        void fromObject(Napi::Env, Napi::Object object) override
        {
            if (object.Has("id"))
            {
                parent->id(ToNativeValue<uint16_t>(object.Get("id")));
            }

            if (object.Has("type")) {
                parent->type((sc::MovieClipModifier::Type)ToNativeValue<uint8_t>(object.Get("type")));
            }
        }

    private:
        /* 
        & Id
         */
        void set_id(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_id(const Napi::CallbackInfo& info);

        /* 
        & Type
         */
        void set_Type(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Type(const Napi::CallbackInfo& info);

        
    };
}