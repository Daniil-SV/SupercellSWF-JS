#include "SupercellSWF.h"

#include <SupercellCompression/Signature.h>

using namespace node_binding;

namespace scNapi
{
    Napi::FunctionReference SupercellSWF::constructor;
    SupercellSWF::SupercellSWF(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<SupercellSWF>(info)
    {
        Utils::initializeClass(this, info);

        exports = new Vector<sc::ExportName>(&parent->exports);
        textures = new Vector<sc::SWFTexture>(&parent->textures);
        movieClipModifiers = new Vector<sc::MovieClipModifier>(&parent->movieClipModifiers);
        shapes = new Vector<sc::Shape>(&parent->shapes);
        textFields = new Vector<sc::TextField>(&parent->textFields);
        matrixBanks = new Vector<sc::MatrixBank>(&parent->matrixBanks);
        movieClips = new Vector<sc::MovieClip>(&parent->movieClips);
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
                    InstanceMethod("loadInternal", &SupercellSWF::loadInternal),

                    InstanceMethod("save", &SupercellSWF::save),

                    /*
                    ? Simple member accessors
                    */
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
                    InstanceMethod("__set_shapes_length__", &SupercellSWF::set_shapes_length),

                    /*
                    ! Texture array getters
                     */
                    InstanceMethod("__get_texture__", &SupercellSWF::get_texture),
                    InstanceMethod("__insert_texture__", &SupercellSWF::insert_texture),
                    InstanceMethod("__remove_texture__", &SupercellSWF::remove_texture),
                    InstanceMethod("__get_texture_length__", &SupercellSWF::get_texture_length),
                    InstanceMethod("__set_texture_length__", &SupercellSWF::set_texture_length),

                    /*
                    ! TextField array getters
                     */
                    InstanceMethod("__get_textfield__", &SupercellSWF::get_textfield),
                    InstanceMethod("__insert_textfield__", &SupercellSWF::insert_textfield),
                    InstanceMethod("__remove_textfield__", &SupercellSWF::remove_textfield),
                    InstanceMethod("__get_textfields_length__", &SupercellSWF::get_textfields_length),
                    InstanceMethod("__set_textfields_length__", &SupercellSWF::set_textfields_length),

                    /*
                    ! Modifiers array getters
                     */
                    InstanceMethod("__get_modifier__", &SupercellSWF::get_modifier),
                    InstanceMethod("__insert_modifier__", &SupercellSWF::insert_modifier),
                    InstanceMethod("__remove_modifier__", &SupercellSWF::remove_modifier),
                    InstanceMethod("__get_modifiers_length__", &SupercellSWF::get_modifiers_length),
                    InstanceMethod("__set_modifiers_length__", &SupercellSWF::set_modifiers_length),

                    /*
                    ! Matrix banks
                     */
                    InstanceMethod("__get_bank__", &SupercellSWF::get_bank),
                    InstanceMethod("__insert_bank__", &SupercellSWF::insert_bank),
                    InstanceMethod("__remove_bank__", &SupercellSWF::remove_bank),
                    InstanceMethod("__get_banks_length__", &SupercellSWF::get_banks_length),
                    InstanceMethod("__set_banks_length__", &SupercellSWF::set_banks_length),

                    /*
                    ! MovieClips
                     */
                    InstanceMethod("__get_movieclip__", &SupercellSWF::get_movieclip),
                    InstanceMethod("__insert_movieclip__", &SupercellSWF::insert_movieclip),
                    InstanceMethod("__remove_movieclip__", &SupercellSWF::remove_movieclip),
                    InstanceMethod("__get_movieclips_length__", &SupercellSWF::get_movieclips_length),
                    InstanceMethod("__set_movieclips_length__", &SupercellSWF::set_movieclips_length)

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
        parent->load(ToNativeValue<std::string>(info[0]));
        return info.This();
    }
    Napi::Value SupercellSWF::loadInternal(const Napi::CallbackInfo& info) {
        parent->loadInternal(ToNativeValue<std::string>(info[0]), ToNativeValue<bool>(info[1]));
        return info.This();
    }

    Napi::Value SupercellSWF::save(const Napi::CallbackInfo& info) {
        parent->save(ToNativeValue<std::string>(info[0]), (sc::CompressionSignature)ToNativeValue<uint8_t>(info[1]));
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
        return exports->insert_item(info, ExportName::Unwrap(info[0].ToObject())->get_parent());
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
    Napi::Value SupercellSWF::get_shape(const Napi::CallbackInfo& info)
    {
        return shapes->get_item(info);
    }
    Napi::Value SupercellSWF::insert_shape(const Napi::CallbackInfo& info)
    {
        return shapes->insert_item(info, Shape::Unwrap(info[0].ToObject())->get_parent());
    }
    Napi::Value SupercellSWF::remove_shape(const Napi::CallbackInfo& info)
    {
        return shapes->remove_item(info);
    }
    Napi::Value SupercellSWF::get_shapes_length(const Napi::CallbackInfo& info)
    {
        return shapes->get_length(info);
    }
    void SupercellSWF::set_shapes_length(const Napi::CallbackInfo& info)
    {
        return shapes->set_length(info);
    }

    /*
    ! Textures
     */

    Napi::Value SupercellSWF::get_texture(const Napi::CallbackInfo& info)
    {
        return textures->get_item(info);
    }
    Napi::Value SupercellSWF::insert_texture(const Napi::CallbackInfo& info)
    {
        return textures->insert_item(info, SWFTexture::Unwrap(info[0].ToObject())->get_parent());
    }
    Napi::Value SupercellSWF::remove_texture(const Napi::CallbackInfo& info)
    {
        return textures->remove_item(info);
    }
    Napi::Value SupercellSWF::get_texture_length(const Napi::CallbackInfo& info)
    {
        return textures->get_length(info);
    }
    void SupercellSWF::set_texture_length(const Napi::CallbackInfo& info)
    {
        return textures->set_length(info);
    }

    /*
    ! TextFields
     */

    Napi::Value SupercellSWF::get_textfield(const Napi::CallbackInfo& info)
    {
        return textFields->get_item(info);
    }
    Napi::Value SupercellSWF::insert_textfield(const Napi::CallbackInfo& info)
    {
        return textFields->insert_item(info, TextField::Unwrap(info[0].ToObject())->get_parent());
    }
    Napi::Value SupercellSWF::remove_textfield(const Napi::CallbackInfo& info)
    {
        return textFields->remove_item(info);
    }
    Napi::Value SupercellSWF::get_textfields_length(const Napi::CallbackInfo& info)
    {
        return textFields->get_length(info);
    }
    void SupercellSWF::set_textfields_length(const Napi::CallbackInfo& info)
    {
        return textFields->set_length(info);
    }

    /*
    ! MovieClip modifiers
     */

    Napi::Value SupercellSWF::get_modifier(const Napi::CallbackInfo& info)
    {
        return movieClipModifiers->get_item(info);
    }
    Napi::Value SupercellSWF::insert_modifier(const Napi::CallbackInfo& info)
    {
        return movieClipModifiers->insert_item(info, MovieClipModifier::Unwrap(info[0].ToObject())->get_parent());
    }
    Napi::Value SupercellSWF::remove_modifier(const Napi::CallbackInfo& info)
    {
        return movieClipModifiers->remove_item(info);
    }
    Napi::Value SupercellSWF::get_modifiers_length(const Napi::CallbackInfo& info)
    {
        return movieClipModifiers->get_length(info);
    }
    void SupercellSWF::set_modifiers_length(const Napi::CallbackInfo& info)
    {
        return movieClipModifiers->set_length(info);
    }

    /*
    ! Banks
     */

    Napi::Value SupercellSWF::get_bank(const Napi::CallbackInfo& info)
    {
        return matrixBanks->get_item(info);
    }
    Napi::Value SupercellSWF::insert_bank(const Napi::CallbackInfo& info)
    {
        return matrixBanks->insert_item(info, MatrixBank::Unwrap(info[0].ToObject())->get_parent());
    }
    Napi::Value SupercellSWF::remove_bank(const Napi::CallbackInfo& info)
    {
        return matrixBanks->remove_item(info);
    }
    Napi::Value SupercellSWF::get_banks_length(const Napi::CallbackInfo& info)
    {
        return matrixBanks->get_length(info);
    }
    void SupercellSWF::set_banks_length(const Napi::CallbackInfo& info)
    {
        return matrixBanks->set_length(info);
    }

    /*
    ! MovieClips
     */

    Napi::Value SupercellSWF::get_movieclip(const Napi::CallbackInfo& info)
    {
        return matrixBanks->get_item(info);
    }
    Napi::Value SupercellSWF::insert_movieclip(const Napi::CallbackInfo& info)
    {
        return matrixBanks->insert_item(info, MatrixBank::Unwrap(info[0].ToObject())->get_parent());
    }
    Napi::Value SupercellSWF::remove_movieclip(const Napi::CallbackInfo& info)
    {
        return matrixBanks->remove_item(info);
    }
    Napi::Value SupercellSWF::get_movieclips_length(const Napi::CallbackInfo& info)
    {
        return matrixBanks->get_length(info);
    }
    void SupercellSWF::set_movieclips_length(const Napi::CallbackInfo& info)
    {
        return matrixBanks->set_length(info);
    }

    /*
    & & Getters
    */

    /*
    & Use external texture getter
    */
    void SupercellSWF::set_UseExternalTexture(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->useExternalTexture(ToNativeValue<bool>(value));
    }
    Napi::Value SupercellSWF::get_UseExternalTexture(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->useExternalTexture());
    }


    /*
    & Use lowres texture getter
    */
    void SupercellSWF::set_UseLowResTexture(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->useLowResTexture(ToNativeValue<bool>(value));
    };
    Napi::Value SupercellSWF::get_UseLowResTexture(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->useLowResTexture());
    };


    /*
    & Use multires texture getter
    */
    void SupercellSWF::set_UseMultiResTexture(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->useMultiResTexture(ToNativeValue<bool>(value));
    };
    Napi::Value SupercellSWF::get_UseMultiResTexture(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->useMultiResTexture());
    };


    /*
    & Highres texture suffix getter
    */
    void SupercellSWF::set_MultiresTexureSuffix(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->multiResFileSuffix(ToNativeValue<std::string>(value));
    }
    Napi::Value SupercellSWF::get_MultiResTexurePostfix(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->multiResFileSuffix());
    }


    /*
    & Lowres texture suffix getter
    */
    void SupercellSWF::set_LowResTextureSuffix(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->lowResFileSuffix(ToNativeValue<std::string>(value));
    }
    Napi::Value SupercellSWF::get_LowResTexureSuffix(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->lowResFileSuffix());
    }
}
