#include "SupercellSWF.h"
namespace scNode
{
    SupercellSWF::SupercellSWF(const Napi::CallbackInfo &info) : Napi::ObjectWrap<SupercellSWF>(info) {}

    void SupercellSWF::Initialize(Napi::Env &env, Napi::Object &target)
    {
        Napi::Function constructor = Napi::ObjectWrap<SupercellSWF>::DefineClass(env, "SupercellSWF", {
            Napi::ObjectWrap<SupercellSWF>::InstanceMethod("load", &SupercellSWF::load),
            Napi::ObjectWrap<SupercellSWF>::InstanceAccessor<&SupercellSWF::getCompression, &SupercellSWF::setCompression>("compression"),
            Napi::ObjectWrap<SupercellSWF>::InstanceAccessor<&SupercellSWF::getHasExternalTexture, &SupercellSWF::setHasExternalTexture>("hasExternalTexture"),
            // Napi::ObjectWrap<SupercellSWF>::InstanceAccessor<&SupercellSWF::getUseMultiResTexture, &SupercellSWF::setUseMultiResTexture>("useMultiResTexture"),
            // Napi::ObjectWrap<SupercellSWF>::InstanceAccessor<&SupercellSWF::getUseLowresTexture, &SupercellSWF::setUseLowresTexture>("useLowresTexture"),
            Napi::ObjectWrap<SupercellSWF>::InstanceAccessor<&SupercellSWF::getMultiResTexurePostfix, &SupercellSWF::setMultiresTexurePostfix>("multiResTexturePostfix"),
            Napi::ObjectWrap<SupercellSWF>::InstanceAccessor<&SupercellSWF::getLowResTexurePostfix, &SupercellSWF::setLowResTexturePostfix>("lowResTexturePostfix")
        });

        target.Set("SupercellSWF", constructor);
    }

    /* Compression */
    void SupercellSWF::setCompression(const Napi::CallbackInfo &info, const Napi::Value &value)
    {
        if (info[0].IsBoolean())
        {
        }
    }

    Napi::Value SupercellSWF::getCompression(const Napi::CallbackInfo &info)
    {
        return Napi::Number::New(info.Env(), 0);
    }

    /* Has external texture getters */
    void SupercellSWF::setHasExternalTexture(const Napi::CallbackInfo &info, const Napi::Value &value)
    {
        if (info[0].IsBoolean())
        {

        }
    }
    Napi::Value SupercellSWF::getHasExternalTexture(const Napi::CallbackInfo &info)
    {
        return Napi::Boolean::New(info.Env(), false);
    }

    /* Lowres texture postfix */
    void SupercellSWF::setLowResTexturePostfix(const Napi::CallbackInfo &info, const Napi::Value &value)
    {
        if (info[0].IsString())
        {
            sc::SupercellSWF::setLowResTexturePostfix(info[0].ToString().Utf8Value());
        }
    }
    Napi::Value SupercellSWF::getLowResTexurePostfix(const Napi::CallbackInfo &info)
    {
        return Napi::String::New(info.Env(), sc::SupercellSWF::lowResFileSuffix());
    }

    /* Multires texture postfix */
    void SupercellSWF::setMultiresTexurePostfix(const Napi::CallbackInfo &info, const Napi::Value &value)
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

        return env.Undefined();
    }
}
