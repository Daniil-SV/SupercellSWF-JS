#include "SupercellSWF.h"
#include "node_binding/constructor.h" 
// TODO: make more sense for this

#include "common/Export.h"

#include <SupercellCompression/Signature.h>
#include <iostream>

using namespace node_binding;

namespace scNapi
{
    SupercellSWF::SupercellSWF(const Napi::CallbackInfo& info): Napi::ObjectWrap<SupercellSWF>(info)
    {
        if (info.Length() != 1)
        {
            return;
        }

        // Init from C++
        if (info[0].IsExternal())
        {
            parent = info[0].As<Napi::External<sc::SupercellSWF>>().Data();
        }
        else
        {
            parent = new sc::SupercellSWF();
        }

        // Init from JS
        if (info[0].IsObject())
        {
            // TODO
        }

    }

    void SupercellSWF::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =

            DefineClass(env, "SupercellSWF",
                {
                    /*
                    * Methods
                    */
                    InstanceMethod("load", &SupercellSWF::load),

                    /*
                    ? Simple member accessors
                    */
                    InstanceAccessor("compression", &SupercellSWF::get_Compression, &SupercellSWF::set_Compression),
                    InstanceAccessor("useExternalTexture", &SupercellSWF::get_UseExternalTexture, &SupercellSWF::set_UseExternalTexture),
                    InstanceAccessor("useLowResTexture", &SupercellSWF::get_UseLowResTexture, &SupercellSWF::set_UseLowResTexture),
                    InstanceAccessor("useMultiResTexture", &SupercellSWF::get_UseMultiResTexture, &SupercellSWF::set_UseMultiResTexture),
                    InstanceAccessor("multiResTextureSuffix", &SupercellSWF::get_MultiResTexurePostfix, &SupercellSWF::set_MultiresTexureSuffix),
                    InstanceAccessor("lowResTextureSuffix", &SupercellSWF::get_LowResTexureSuffix, &SupercellSWF::set_LowResTextureSuffix),

                    /*
                    ! Exports array getters
                    */
                    InstanceMethod("get_export_item", &SupercellSWF::get_export_item),
                    InstanceMethod("push_export_items", &SupercellSWF::push_export_items),
                    InstanceMethod("get_exports_length", &SupercellSWF::get_exports_length),
                    InstanceMethod("set_exports_length", &SupercellSWF::set_exports_length)

                });

        Napi::FunctionReference constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("SupercellSWF", func);
    }

    /*
    * Methods
    */

    Napi::Value SupercellSWF::load(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        if (!info[0].IsString())
        {
            Napi::TypeError::New(env, "First argument must be a String!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        std::string filepath = info[0].ToString().Utf8Value();
        parent->load(filepath);

        return info.This();
    }

    /*
    ! Arrays
    */

    /*
    ! Exports
    */

    Napi::Value SupercellSWF::get_exports_length(const Napi::CallbackInfo& info)
    {
        return Napi::Number::New(info.Env(), parent->exports.size());
    }
    void SupercellSWF::set_exports_length(const Napi::CallbackInfo& info)
    {
        uint32_t new_size = info[0].ToNumber().Int32Value();
        parent->exports.resize(static_cast<size_t>(new_size));
    }
    Napi::Value SupercellSWF::get_export_item(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();
        uint32_t index = info[0].ToNumber().Int32Value();
        if (parent->exports.size() >= index)
        {
            return Export::constructor.New({ Napi::External<sc::Export>::New(env, &(parent->exports.at(index))) });
        }
        else
        {
            return env.Undefined();
        }
    }
    Napi::Value SupercellSWF::push_export_items(const Napi::CallbackInfo& info)
    {
        return Napi::Number::New(info.Env(), 0);
    }



    /*
    & Compression getter
    */
    void SupercellSWF::set_Compression(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        if (value.IsNumber())
        {
            parent->compression = static_cast<sc::CompressionSignature>(value.ToNumber().Int32Value());
        }
    }
    Napi::Value SupercellSWF::get_Compression(const Napi::CallbackInfo& info)
    {
        return Napi::Number::New(info.Env(), Napi::Number::New(info.Env(), static_cast<double>(parent->compression)));
    }

    /*
    & Use external texture getter
    */
    void SupercellSWF::set_UseExternalTexture(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        if (value.IsBoolean())
        {
            parent->useExternalTexture(value.ToBoolean().Value());
        }
    }
    Napi::Value SupercellSWF::get_UseExternalTexture(const Napi::CallbackInfo& info)
    {
        return Napi::Boolean::New(info.Env(), parent->useExternalTexture());
    }


    /*
    & Use lowres texture getter
    */
    void SupercellSWF::set_UseLowResTexture(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        if (value.IsBoolean())
        {
            parent->useLowResTexture(value.ToBoolean().Value());
        }
    };
    Napi::Value SupercellSWF::get_UseLowResTexture(const Napi::CallbackInfo& info)
    {
        return Napi::Boolean::New(info.Env(), parent->useLowResTexture());
    };


    /*
    & Use multires texture getter
    */
    void SupercellSWF::set_UseMultiResTexture(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        if (value.IsBoolean())
        {
            parent->useMultiResTexture(value.ToBoolean().Value());
        }
    };
    Napi::Value SupercellSWF::get_UseMultiResTexture(const Napi::CallbackInfo& info)
    {
        return Napi::Boolean::New(info.Env(), parent->useMultiResTexture());
    };


    /*
    & Highres texture suffix getter
    */
    void SupercellSWF::set_MultiresTexureSuffix(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        if (value.IsString())
        {
            parent->multiResFileSuffix(value.ToString().Utf8Value());
        }
    }
    Napi::Value SupercellSWF::get_MultiResTexurePostfix(const Napi::CallbackInfo& info)
    {
        return Napi::String::New(info.Env(), parent->multiResFileSuffix());
    }


    /*
    & Lowres texture suffix getter
    */
    void SupercellSWF::set_LowResTextureSuffix(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        if (value.IsString())
        {
            parent->lowResFileSuffix(value.ToString().Utf8Value());
        }
    }
    Napi::Value SupercellSWF::get_LowResTexureSuffix(const Napi::CallbackInfo& info)
    {
        return Napi::String::New(info.Env(), parent->lowResFileSuffix());
    }
}
