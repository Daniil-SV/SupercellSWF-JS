#include "ExportName.h"

namespace scNapi
{
    Napi::FunctionReference ExportName::constructor;
    ExportName::ExportName(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<ExportName>(info)
    {
        Utils::initializeClass<sc::ExportName>(this, info);
    };

    void ExportName::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "Export",
                {
                    InstanceAccessor("id", &ExportName::get_id, &ExportName::set_id),
                    InstanceAccessor("name", &ExportName::get_name, &ExportName::set_name)
                });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("ExportName", func);
    }

    void ExportName::set_id(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->id = ToNativeValue<uint16_t>(value);
    }
    Napi::Value ExportName::get_id(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->id);
    }

    void ExportName::set_name(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        if (value.IsString())
        {
            parent->name = std::string(value.ToString());
        }
    }
    Napi::Value ExportName::get_name(const Napi::CallbackInfo& info)
    {
        if (parent != nullptr) {
            return Napi::String::New(info.Env(), parent->name);
        } else {
            return info.Env().Null();
        }
    }

}