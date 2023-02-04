#include "SupercellSWF.h"
#include "SupercellCompression/Signature.h"
namespace scNode
{
    SupercellSWF::SupercellSWF(const Napi::CallbackInfo &info) : Napi::ObjectWrap<SupercellSWF>(info) {}

    void SupercellSWF::Initialize(Napi::Env &env, Napi::Object &target)
    {
        Napi::Function constructor = Napi::ObjectWrap<SupercellSWF>::DefineClass(env, "SupercellSWF", {
            Napi::ObjectWrap<SupercellSWF>::InstanceMethod("load", &SupercellSWF::load),
            Napi::ObjectWrap<SupercellSWF>::InstanceAccessor<&SupercellSWF::get_сompression, &SupercellSWF::set_сompression>("compression"),
            Napi::ObjectWrap<SupercellSWF>::InstanceAccessor<&SupercellSWF::get_hasExternalTexture, &SupercellSWF::set_hasExternalTexture>("hasExternalTexture"),
            // Napi::ObjectWrap<SupercellSWF>::InstanceAccessor<&SupercellSWF::getUseMultiResTexture, &SupercellSWF::setUseMultiResTexture>("useMultiResTexture"),
            // Napi::ObjectWrap<SupercellSWF>::InstanceAccessor<&SupercellSWF::getUseLowresTexture, &SupercellSWF::setUseLowresTexture>("useLowresTexture"),
            Napi::ObjectWrap<SupercellSWF>::InstanceAccessor<&SupercellSWF::getMultiResTexurePostfix, &SupercellSWF::setMultiresTexureSuffix>("multiResTextureSuffix"),
            Napi::ObjectWrap<SupercellSWF>::InstanceAccessor<&SupercellSWF::getLowResTexureSuffix, &SupercellSWF::setLowResTextureSuffix>("lowResTextureSuffix")
        });

        target.Set("SupercellSWF", constructor);
    }

    /* Compression */
    void SupercellSWF::set_сompression(const Napi::CallbackInfo &info, const Napi::Value &value)
    {
        if (info[0].IsNumber())
        {
            compression = static_cast<sc::CompressionSignature>(info[0].ToNumber().Int32Value());
        }
    }

    Napi::Value SupercellSWF::get_сompression(const Napi::CallbackInfo &info)
    {
        return Napi::Number::New(info.Env(), Napi::Number::New(info.Env(), static_cast<double>(compression)));
    }

    /* Has external texture getters */
    void SupercellSWF::set_hasExternalTexture(const Napi::CallbackInfo &info, const Napi::Value &value)
    {
        if (info[0].IsBoolean())
        {
            sc::SupercellSWF::setUseExternalTexture(info[0].ToBoolean().Value());
        }
    }
    Napi::Value SupercellSWF::get_hasExternalTexture(const Napi::CallbackInfo &info)
    {
        return Napi::Boolean::New(info.Env(), useExternalTexture());
    }

    /* Lowres texture postfix */
    void SupercellSWF::setLowResTextureSuffix(const Napi::CallbackInfo &info, const Napi::Value &value)
    {
        if (info[0].IsString())
        {
            sc::SupercellSWF::setLowResFileSuffix(info[0].ToString().Utf8Value());
        }
    }
    Napi::Value SupercellSWF::getLowResTexureSuffix(const Napi::CallbackInfo &info)
    {
        return Napi::String::New(info.Env(), sc::SupercellSWF::lowResFileSuffix());
    }

    /* Multires texture postfix */
    void SupercellSWF::setMultiresTexureSuffix(const Napi::CallbackInfo &info, const Napi::Value &value)
    {
        if (info[0].IsString())
        {
            sc::SupercellSWF::setMultiResFileSuffix(info[0].ToString().Utf8Value());
        }
    }
    Napi::Value SupercellSWF::getMultiResTexurePostfix(const Napi::CallbackInfo &info)
    {
        return Napi::String::New(info.Env(), sc::SupercellSWF::multiResFileSuffix());
    }

    /* Base functions */

    Napi::Value SupercellSWF::load(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env();

        if (!info[0].IsString())
        {
            Napi::TypeError::New(env, "First argument must be a String!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        std::string filepath = info[0].ToString().Utf8Value();
        sc::SupercellSWF::load(filepath);

        return info.This();
    }

    Napi::Value SupercellSWF::loadAsset(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env();

        if (!info[0].IsString())
        {
            Napi::TypeError::New(env, "First argument must be a String!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        std::string filepath = info[0].ToString().Utf8Value();
        sc::SupercellSWF::loadAsset(filepath);

        return info.This();
    }
}
