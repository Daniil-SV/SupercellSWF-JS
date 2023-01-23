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
        void setCompression(const Napi::CallbackInfo &info, const Napi::Value &value); // TODO
        Napi::Value getCompression(const Napi::CallbackInfo &info);

        /* Has external texture */
        void setHasExternalTexture(const Napi::CallbackInfo &info, const Napi::Value &value);
        Napi::Value getHasExternalTexture(const Napi::CallbackInfo &info); // TODO

        /* Lowres texture postfix */
        void setLowResTexturePostfix(const Napi::CallbackInfo &info, const Napi::Value &value);
        Napi::Value getLowResTexurePostfix(const Napi::CallbackInfo &info);

        /* Highres texture postfix */
        void setMultiresTexurePostfix(const Napi::CallbackInfo &info, const Napi::Value &value);
        Napi::Value getMultiResTexurePostfix(const Napi::CallbackInfo &info);
    
        Napi::Value load(const Napi::CallbackInfo &info);
    };
}
