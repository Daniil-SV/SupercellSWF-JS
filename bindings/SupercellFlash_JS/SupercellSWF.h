#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

namespace scNapi
{
    class SupercellSWF : public Napi::ObjectWrap<SupercellSWF>, public sc::SupercellSWF
    {
    public:
        SupercellSWF(const Napi::CallbackInfo &info);
        static void Init(Napi::Env &env, Napi::Object &target);

        /* 
        * Class Functions
        */
    private:
        /* 
        * Usual sc loading
        */
       Napi::Value load(const Napi::CallbackInfo &info);

        /* 
        ! Arrays
        */
    private:
        /* 
        ! Exports
        */    
        Napi::Value get_exports_length(const Napi::CallbackInfo &info);
        void set_exports_length(const Napi::CallbackInfo &info);
        Napi::Value get_export_item(const Napi::CallbackInfo &info);
        Napi::Value push_export_items(const Napi::CallbackInfo &info);
        

        /* 
        & Class Getters
        */
    private:
        /* 
        & Compression getter
        */
        void set_Compression(const Napi::CallbackInfo &info, const Napi::Value &value);
        Napi::Value get_Compression(const Napi::CallbackInfo &info);

        /* 
        & Use external texture getter
        */
        void set_UseExternalTexture(const Napi::CallbackInfo &info, const Napi::Value &value);
        Napi::Value get_UseExternalTexture(const Napi::CallbackInfo &info);

        /* 
        & Use lowres texture getter
        */
        void set_UseLowResTexture(const Napi::CallbackInfo &info, const Napi::Value &value);
        Napi::Value get_UseLowResTexture(const Napi::CallbackInfo &info);

        /* 
        & Use multires texture getter
        */
        void set_UseMultiResTexture(const Napi::CallbackInfo &info, const Napi::Value &value);
        Napi::Value get_UseMultiResTexture(const Napi::CallbackInfo &info);

        /* 
        & Highres texture suffix getter
        */
        void set_MultiresTexureSuffix(const Napi::CallbackInfo &info, const Napi::Value &value);
        Napi::Value get_MultiResTexurePostfix(const Napi::CallbackInfo &info);

        /* 
        & Lowres texture suffix getter
        */
        void set_LowResTextureSuffix(const Napi::CallbackInfo &info, const Napi::Value &value);
        Napi::Value get_LowResTexureSuffix(const Napi::CallbackInfo &info);
        
    };
}
