#pragma once

#include <SupercellFlash/objects/ExportName.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"

using namespace node_binding;

namespace scNapi
{
    class ExportName: public Napi::ObjectWrap<ExportName>, public LinkedObject<sc::ExportName>
    {
    public:
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js
        static void Initialize(Napi::Env& env, Napi::Object& target); // ExportName initialize in Addon
        ExportName(const Napi::CallbackInfo& info); // Node constructor

        void fromObject(Napi::Env&, Napi::Object object) override {
            if (object.Has("id")) {
                parent->id = ToNativeValue<uint16_t>(object.Get("id"));
            }
            if (object.Has("name")) {
                parent->name = ToNativeValue<std::string>(object.Get("name"));
            }
        }

    private:
        /* id */
        void set_id(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_id(const Napi::CallbackInfo& info);

        /* name */
        void set_name(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_name(const Napi::CallbackInfo& info);

    };
}