#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

#include "Utils/Vector.hpp"

namespace scNapi
{
    class SupercellSWF: public Napi::ObjectWrap<SupercellSWF>, public ScObject<sc::SupercellSWF>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        SupercellSWF(const Napi::CallbackInfo& info);// Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        sc::SupercellSWF* get_parent() override
        {
            return parent;
        };

        void set_parent(sc::SupercellSWF* item) override
        {
            parent = item;
        };

        void new_parent() override {
            parent = new sc::SupercellSWF();
        }

        void fromObject(Napi::Object object) override
        {
            // TODO
        }

    private:
        sc::SupercellSWF* parent = nullptr; // SCSWF instance parent

        Vector<sc::Export>* exports = nullptr;
        Vector<sc::Shape>* shapes = nullptr;

        /*
        * Class Functions
        */
    private:
        /*
        * Usual sc loading
        */
        Napi::Value load(const Napi::CallbackInfo& info);

        /*
        ! Arrays
        */
    private:
        /*
        ! Exports
        */
        Napi::Value get_export_item(const Napi::CallbackInfo& info);
        Napi::Value insert_export_item(const Napi::CallbackInfo& info);
        Napi::Value remove_export_item(const Napi::CallbackInfo& info);
        Napi::Value get_exports_length(const Napi::CallbackInfo& info);
        void set_exports_length(const Napi::CallbackInfo& info);

        /*
        ! Shapes
        */
        Napi::Value get_shape(const Napi::CallbackInfo& info);
        Napi::Value insert_shape(const Napi::CallbackInfo& info);
        Napi::Value remove_shape(const Napi::CallbackInfo& info);
        Napi::Value get_shapes_length(const Napi::CallbackInfo& info);
        void set_shapes_length(const Napi::CallbackInfo& info);

        /*
        & Class Getters
        */
    private:
        /*
        & Compression getter
        */
        void set_Compression(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Compression(const Napi::CallbackInfo& info);

        /*
        & Use external texture getter
        */
        void set_UseExternalTexture(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_UseExternalTexture(const Napi::CallbackInfo& info);

        /*
        & Use lowres texture getter
        */
        void set_UseLowResTexture(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_UseLowResTexture(const Napi::CallbackInfo& info);

        /*
        & Use multires texture getter
        */
        void set_UseMultiResTexture(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_UseMultiResTexture(const Napi::CallbackInfo& info);

        /*
        & Highres texture suffix getter
        */
        void set_MultiresTexureSuffix(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_MultiResTexurePostfix(const Napi::CallbackInfo& info);

        /*
        & Lowres texture suffix getter
        */
        void set_LowResTextureSuffix(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_LowResTexureSuffix(const Napi::CallbackInfo& info);

    };
}
