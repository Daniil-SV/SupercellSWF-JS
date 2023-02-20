#include "SupercellSWF.h"

#include <node_binding/constructor.h>
#include <node_binding/type_convertor.h>
#include <SupercellCompression/Signature.h>

#include "common/Export.h"
#include "tag/Shape.h"

using namespace node_binding;

namespace scNapi
{
    Napi::FunctionReference SupercellSWF::constructor;
    SupercellSWF::SupercellSWF(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<SupercellSWF>(info)
    {
        Utils::initializeClass(this, info);

        exports = new Vector<sc::Export>(&parent->exports, &Export::constructor);
        shapes = new Vector<sc::Shape>(&parent->shapes, &Shape::constructor);

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
                    InstanceMethod("__set_exports_length__", &SupercellSWF::set_exports_length),

                    /* 
                    ! Shapes array getters
                    */
                    InstanceMethod("__get_shape__", &SupercellSWF::get_shape),
                    InstanceMethod("__insert_shape__", &SupercellSWF::insert_shape),
                    InstanceMethod("__remove_shape__", &SupercellSWF::remove_shape),
                    InstanceMethod("__get_shapes_length__", &SupercellSWF::get_shapes_length),
                    InstanceMethod("__set_shapes_length__", &SupercellSWF::set_shapes_length)

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
    Napi::Value SupercellSWF::get_export_item(const Napi::CallbackInfo& info)
    {
        return exports->get_item(info);
    }
    Napi::Value SupercellSWF::insert_export_item(const Napi::CallbackInfo& info)
    {
        return exports->insert_item(info, Export::Unwrap(info[0].ToObject())->get_parent());
    };
    Napi::Value SupercellSWF::remove_export_item(const Napi::CallbackInfo& info)
    {
        return exports->remove_item(info);
    };
    Napi::Value SupercellSWF::get_exports_length(const Napi::CallbackInfo& info)
    {
        return exports->get_length(info);
    }
    void SupercellSWF::set_exports_length(const Napi::CallbackInfo& info)
    {
        return exports->set_length(info);
    }

    /* 
    ! Shapes
    */
    Napi::Value SupercellSWF::get_shape(const Napi::CallbackInfo& info) {
        return shapes->get_item(info);
    }
    Napi::Value SupercellSWF::insert_shape(const Napi::CallbackInfo& info) {
        return shapes->insert_item(info, Shape::Unwrap(info[0].ToObject())->get_parent());
    }
    Napi::Value SupercellSWF::remove_shape(const Napi::CallbackInfo& info) {
        return shapes->remove_item(info);
    }
    Napi::Value SupercellSWF::get_shapes_length(const Napi::CallbackInfo& info) {
        return shapes->get_length(info);
    }
    void SupercellSWF::set_shapes_length(const Napi::CallbackInfo& info) {
        return shapes->set_length(info);
    }

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
