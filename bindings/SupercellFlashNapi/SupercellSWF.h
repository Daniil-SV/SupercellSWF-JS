#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Vector.h"
#include "Utils/node_binding/constructor.h"
#include "Utils/node_binding/type_convertor.h"

#include "objects/ExportName.h"
#include "objects/Shape.h"
#include "objects/SWFTexture.h"
#include "objects/TextField.h"
#include "objects/MovieClipModifier.h"
#include "transformation/MatrixBank.h"
#include "objects/MovieClip.h"

namespace scNapi
{
    class SupercellSWF: public Napi::ObjectWrap<SupercellSWF>, public LinkedObject<sc::SupercellSWF>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        SupercellSWF(const Napi::CallbackInfo& info);// Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        void fromObject(Napi::Env env, Napi::Object object) override
        {
            if (object.Has("useMultiResTexture"))
            {
                parent->useMultiResTexture(ToNativeValue<bool>(object.Get("useMultiResTexture")));
            }

            if (object.Has("useLowResTexture"))
            {
                parent->useLowResTexture(ToNativeValue<bool>(object.Get("useLowResTexture")));
            }

            if (object.Has("useExternalTexture"))
            {
                parent->useExternalTexture(ToNativeValue<bool>(object.Get("useExternalTexture")));
            }

            if (object.Has("shapes"))
            {
                Napi::Object shapesVector = object.Get("shapes").ToObject();
                for (Napi::Value value : Utils::IteratorData(env, shapesVector))
                {
                    parent->shapes.push_back(scNapi::Shape::Unwrap(
                        value.As<Napi::Object>()
                    )->get_parent());
                }
            }

            if (object.Has("exports"))
            {
                Napi::Object exportVector = object.Get("exports").ToObject();
                for (Napi::Value value : Utils::IteratorData(env, exportVector))
                {
                    parent->exports.push_back(scNapi::ExportName::Unwrap(
                        value.As<Napi::Object>()
                    )->get_parent());
                }
            }

            if (object.Has("textures"))
            {
                Napi::Object textureVector = object.Get("textures").ToObject();
                for (Napi::Value value : Utils::IteratorData(env, textureVector))
                {
                    parent->textures.push_back(scNapi::SWFTexture::Unwrap(
                        value.As<Napi::Object>()
                    )->get_parent());
                }
            }

            if (object.Has("textFields"))
            {
                Napi::Object textfieldVector = object.Get("textFields").ToObject();
                for (Napi::Value value : Utils::IteratorData(env, textfieldVector))
                {
                    parent->textFields.push_back(scNapi::TextField::Unwrap(
                        value.As<Napi::Object>()
                    )->get_parent());
                }
            }

            if (object.Has("movieClipModifiers"))
            {
                Napi::Object modifierVector = object.Get("movieClipModifiers").ToObject();
                for (Napi::Value value : Utils::IteratorData(env, modifierVector))
                {
                    parent->movieClipModifiers.push_back(scNapi::MovieClipModifier::Unwrap(
                        value.As<Napi::Object>()
                    )->get_parent());
                }
            }

            if (object.Has("matrixBanks"))
            {
                Napi::Object modifierVector = object.Get("matrixBanks").ToObject();
                for (Napi::Value value : Utils::IteratorData(env, modifierVector))
                {
                    parent->matrixBanks.push_back(scNapi::MatrixBank::Unwrap(
                        value.As<Napi::Object>()
                    )->get_parent());
                }
            }
        }

    private:
        Vector<sc::ExportName>* exports = nullptr;
        Vector<sc::SWFTexture>* textures = nullptr;
        Vector<sc::MovieClipModifier>* movieClipModifiers = nullptr;
        Vector<sc::Shape>* shapes = nullptr;
        Vector<sc::TextField>* textFields = nullptr;
        Vector<sc::MatrixBank>* matrixBanks = nullptr;
        Vector<sc::MovieClip>* movieClips = nullptr;

        /*
        * Class Functions
        */
    private:
        Napi::Value load(const Napi::CallbackInfo& info);
        Napi::Value loadInternal(const Napi::CallbackInfo& info);

        Napi::Value save(const Napi::CallbackInfo& info);

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
        ! Tetxures
         */

        Napi::Value get_texture(const Napi::CallbackInfo& info);
        Napi::Value insert_texture(const Napi::CallbackInfo& info);
        Napi::Value remove_texture(const Napi::CallbackInfo& info);
        Napi::Value get_texture_length(const Napi::CallbackInfo& info);
        void set_texture_length(const Napi::CallbackInfo& info);

        /*
        ! TextFields
         */

        Napi::Value get_textfield(const Napi::CallbackInfo& info);
        Napi::Value insert_textfield(const Napi::CallbackInfo& info);
        Napi::Value remove_textfield(const Napi::CallbackInfo& info);
        Napi::Value get_textfields_length(const Napi::CallbackInfo& info);
        void set_textfields_length(const Napi::CallbackInfo& info);

        /*
        ! Modifiers
         */

        Napi::Value get_modifier(const Napi::CallbackInfo& info);
        Napi::Value insert_modifier(const Napi::CallbackInfo& info);
        Napi::Value remove_modifier(const Napi::CallbackInfo& info);
        Napi::Value get_modifiers_length(const Napi::CallbackInfo& info);
        void set_modifiers_length(const Napi::CallbackInfo& info);

        /*
        ! Banks
         */

        Napi::Value get_bank(const Napi::CallbackInfo& info);
        Napi::Value insert_bank(const Napi::CallbackInfo& info);
        Napi::Value remove_bank(const Napi::CallbackInfo& info);
        Napi::Value get_banks_length(const Napi::CallbackInfo& info);
        void set_banks_length(const Napi::CallbackInfo& info);

        /*
        ! MovieClips
         */

        Napi::Value get_movieclip(const Napi::CallbackInfo& info);
        Napi::Value insert_movieclip(const Napi::CallbackInfo& info);
        Napi::Value remove_movieclip(const Napi::CallbackInfo& info);
        Napi::Value get_movieclips_length(const Napi::CallbackInfo& info);
        void set_movieclips_length(const Napi::CallbackInfo& info);


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
