#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

#include "Utils/Utils.hpp"

namespace scNapi {
    class MovieClipFrame: public Napi::ObjectWrap<MovieClipFrame>, public ScObject<sc::MovieClipFrame>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        MovieClipFrame(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        sc::MovieClipFrame* get_parent() override
        {
            return parent;
        };

        void set_parent(sc::MovieClipFrame* item) override
        {
            parent = item;
        };

        void new_parent() override
        {
            parent = new sc::MovieClipFrame();
        }

        void fromObject(Napi::Env&, Napi::Object object) override
        {
            if (object.Has("elementsCount")) {
                parent->elementsCount = ToNativeValue<uint16_t>(object.Get(("elementsCount")));
            }

            if (object.Has("label")) {
                parent->label = ToNativeValue<std::string>(object.Get("label"));
            }
        }

    private:
        sc::MovieClipFrame* parent = nullptr; // Pointer to object that this class is attached to

        /* 
        & ElementsCount
        */
        void set_ElementsCount(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_ElementsCount(const Napi::CallbackInfo& info);

        /* 
        & Label
        */
        void set_Label(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Label(const Napi::CallbackInfo& info);


    };
}