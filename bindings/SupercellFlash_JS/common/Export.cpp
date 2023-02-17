#include "Export.h"

namespace scNapi
{
    Napi::FunctionReference Export::constructor;

    Export::Export(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<Export>(info)
    {
        // Init from C++
        if (info[0].IsExternal()) {
            parent = info[0].As<Napi::External<sc::Export>>().Data();
        } else {
            parent = new sc::Export();
        }

        // Init from JS
        if (info[0].IsObject()) {
            Napi::Object obj = info[0].ToObject();
            if (obj.Has("id")) {
                Napi::Value id_value = obj.Get("id");
                if (id_value.IsNumber()) {
                    parent->id = static_cast<uint16_t>(id_value.ToNumber().Uint32Value());
                }
            }
            if (obj.Has("name")) {
                Napi::Value name_value = obj.Get("name");
                if (name_value.IsString()) {
                    parent->name = std::string(name_value.ToString());
                }
            }
        }
    };

    void Export::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "Export",
                {
                    InstanceAccessor("id", &Export::get_id, &Export::set_id),
                    InstanceAccessor("name", &Export::get_name, &Export::set_name)
                });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("Export", func);
    }

    void Export::set_id(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        /* if (value.IsNumber())
        {
            parent->id = static_cast<uint16_t>(value.ToNumber().Int32Value());
        } */
    }
    Napi::Value Export::get_id(const Napi::CallbackInfo& info)
    {
        if (parent != nullptr) {
            return Napi::Number::New(info.Env(), parent->id);
        } else {
            return info.Env().Null();
        }
    }

    void Export::set_name(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        if (value.IsString())
        {
            parent->name = std::string(value.ToString());
        }
    }
    Napi::Value Export::get_name(const Napi::CallbackInfo& info)
    {
        if (parent != nullptr) {
            return Napi::String::New(info.Env(), parent->name);
        } else {
            return info.Env().Null();
        }
    }

}