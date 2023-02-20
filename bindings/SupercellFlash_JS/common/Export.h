#pragma once

#include <SupercellFlash.h>

#include <napi.h>
#include <node_binding/constructor.h>
#include <node_binding/type_convertor.h>

#include "Utils/Utils.hpp"
#include "Utils/ScObject.hpp"

using namespace node_binding;

namespace scNapi
{
    class Export: public Napi::ObjectWrap<Export>, public ScObject<sc::Export>
    {
    public:
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        Export(const Napi::CallbackInfo& info); // Node constructor

        sc::Export* get_parent() override
        {
            return parent;
        };

        void set_parent(sc::Export* item) override
        {
            parent = item;
        }; 

        void new_parent() override {
            parent = new sc::Export();
        }

        void fromObject(Napi::Object object) override {
            if (object.Has("id")) {
                parent->id = ToNativeValue<uint16_t>(object.Get("id"));
            }
            if (object.Has("name")) {
                parent->name = ToNativeValue<std::string>(object.Get("name"));
            }
        }

    private:
        sc::Export* parent = nullptr; // Pointer to object that this class is attached to

        /* id */
        void set_id(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_id(const Napi::CallbackInfo& info);

        /* name */
        void set_name(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_name(const Napi::CallbackInfo& info);

    };
}