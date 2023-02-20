#include "Export.h"

namespace scNapi
{
    Napi::FunctionReference Export::constructor;
    Export::Export(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<Export>(info)
    {
        Utils::initializeClass<sc::Export>(this, info);
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
        if (value.IsNumber())
        {
            parent->id = static_cast<uint16_t>(value.ToNumber().Int32Value());
        }
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