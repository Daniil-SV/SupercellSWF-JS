#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

namespace scNode
{
    class SupercellSWF : public Napi::ObjectWrap<SupercellSWF>, public sc::SupercellSWF
    {
    public:
        SupercellSWF(const Napi::CallbackInfo &info);
        static void Initialize(Napi::Env &env, Napi::Object &target);

    private:
        /* Compression */
        void set_сompression(const Napi::CallbackInfo &info, const Napi::Value &value);
        Napi::Value get_сompression(const Napi::CallbackInfo &info);

        /* Has external texture */
        void set_hasExternalTexture(const Napi::CallbackInfo &info, const Napi::Value &value);
        Napi::Value get_hasExternalTexture(const Napi::CallbackInfo &info);

        /* Lowres texture postfix */
        void setLowResTextureSuffix(const Napi::CallbackInfo &info, const Napi::Value &value);
        Napi::Value getLowResTexureSuffix(const Napi::CallbackInfo &info);

        /* Highres texture postfix */
        void setMultiresTexureSuffix(const Napi::CallbackInfo &info, const Napi::Value &value);
        Napi::Value getMultiResTexurePostfix(const Napi::CallbackInfo &info);
    
        Napi::Value load(const Napi::CallbackInfo &info);
        Napi::Value loadAsset(const Napi::CallbackInfo &info);
    };
}
