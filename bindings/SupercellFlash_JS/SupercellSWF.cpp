#include "SupercellSWF.h"
#include <node_binding/constructor.h>
#include <node_binding/type_convertor.h>

#include "common/Export.h"

#include <SupercellCompression/Signature.h>
#include <iostream>

using namespace node_binding;

namespace scNapi
{
    Napi::FunctionReference SupercellSWF::constructor;
    SupercellSWF::SupercellSWF(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<SupercellSWF>(info)
    {
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
                    InstanceMethod("__get_export_item__", &SupercellSWF::get_export_item),
                    InstanceMethod("__insert_export_item__", &SupercellSWF::insert_export_item),
                    InstanceMethod("__remove_export_item__", &SupercellSWF::remove_export_item),
                    InstanceMethod("__get_exports_length__", &SupercellSWF::get_exports_length),
                    InstanceMethod("__set_exports_length__", &SupercellSWF::set_exports_length)

                });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("SupercellSWF", func);
    }

    /*
    * * Methods
    */

    Napi::Value SupercellSWF::load(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        if (info.Length() <= 0)
        {
            THROW_JS_WRONG_NUMBER_OF_ARGUMENTS(env);
        }

        if (!info[0].IsString())
        {
            Napi::TypeError::New(env, "First argument must be a String!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        std::string filepath = ToNativeValue<std::string>(info[0]);
        parent->load(filepath);

        return info.This();
    }

    /*
    ! ! Arrays
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
        int32_t new_size = info[0].ToNumber().Int32Value();
        parent->exports.resize(static_cast<size_t>(new_size));
    }
    Napi::Value SupercellSWF::get_export_item(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();
        uint32_t index = info[0].ToNumber().Int32Value();
        try{
            sc::Export* item = &(parent->exports.at(index));
            return Export::constructor.New({ Napi::External<sc::Export>::New(env, item) });
        } catch (const std::out_of_range& err) {
            return info.Env().Undefined();
        }
    }
    Napi::Value SupercellSWF::insert_export_item(const Napi::CallbackInfo& info)
    {
        Export* item = Export::Unwrap(info[0].ToObject());
        parent->exports.insert(
            parent->exports.begin() +
            ToNativeValue<uint32_t>(info[1].ToNumber()),
            *item->parent);

        return Napi::Boolean::New(info.Env(), true);
    };
    Napi::Value SupercellSWF::remove_export_item(const Napi::CallbackInfo& info)
    {
        parent->exports.erase(parent->exports.begin() + ToNativeValue<uint32_t>(info[0].ToNumber()));
        return Napi::Boolean::New(info.Env(), true);
    };

    /* 
    & & Getters
    */

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
