#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

#include "Utils/Utils.h"

namespace scNapi {
    class Matrix2x3: public Napi::ObjectWrap<Matrix2x3>, public LinkedObject<sc::Matrix2x3>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        Matrix2x3(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        void fromObject(Napi::Env, Napi::Object object) override
        {
            if (object.Has("a")) {
                parent->a = ToNativeValue<float>(object.Get("a"));
            }
            if (object.Has("b")) {
                parent->b = ToNativeValue<float>(object.Get("b"));
            }
            if (object.Has("c")) {
                parent->c = ToNativeValue<float>(object.Get("c"));
            }
            if (object.Has("d")) {
                parent->d = ToNativeValue<float>(object.Get("d"));
            }
            if (object.Has("tx")) {
                parent->tx = ToNativeValue<float>(object.Get("tx"));
            }
            if (object.Has("ty")) {
                parent->ty = ToNativeValue<float>(object.Get("ty"));
            }
        }

    private:
        /*
        & X scew
         */
        void set_a(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_a(const Napi::CallbackInfo& info);

        /*
        & X scale
         */
        void set_b(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_b(const Napi::CallbackInfo& info);

        /* 
        & Y scale
         */
        void set_c(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_c(const Napi::CallbackInfo& info);

        /* 
        & Y scew
         */
        void set_d(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_d(const Napi::CallbackInfo& info);

        /* 
        & X Translation
         */
        void set_tx(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_tx(const Napi::CallbackInfo& info);

        /* 
        & Y Translation
         */
        void set_ty(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_ty(const Napi::CallbackInfo& info);

    };

}