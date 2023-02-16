#include "Export.h"

namespace scNapi
{
    Export::Export(const Napi::CallbackInfo& info): Napi::ObjectWrap<Export>(info) {}

    void Export::Init(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "Export",
                {
                    /* Info about file */
                    InstanceAccessor("id", &Export::get_id, &Export::set_id)
                });

        Napi::FunctionReference constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("Export", func);
    }

    void Export::set_id(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        if (value.IsNumber())
        {
            id = value.ToNumber().Int32Value();
        }
    }

    Napi::Value Export::get_id(const Napi::CallbackInfo& info)
    {
        return Napi::Number::New(info.Env(), Napi::Number::New(info.Env(), id));
    }

}