#include "MatrixBank.h"

#include "Matrix2x3.h"
#include "ColorTransform.h"

namespace scNapi
{
    void MatrixBank::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "MatrixBank",
                {
                    /*
                    ! Matrcies
                    */
                    InstanceMethod("__get_matrix__", &MatrixBank::get_matrix),
                    InstanceMethod("__insert_matrix__", &MatrixBank::insert_matrix),
                    InstanceMethod("__remove_matrix__", &MatrixBank::remove_matrix),
                    InstanceMethod("__get_matrices_length__", &MatrixBank::get_matrices_length),
                    InstanceMethod("__set_matrices_length__", &MatrixBank::set_matrices_length),

                    /*
                    ! Colors
                    */
                    InstanceMethod("__get_color__", &MatrixBank::get_color),
                    InstanceMethod("__insert_color__", &MatrixBank::insert_color),
                    InstanceMethod("__remove_color__", &MatrixBank::remove_color),
                    InstanceMethod("__get_colors_length__", &MatrixBank::get_colors_length),
                    InstanceMethod("__set_colors_length__", &MatrixBank::set_colors_length),
                });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("MatrixBank", func);
    }

    Napi::FunctionReference MatrixBank::constructor;
    MatrixBank::MatrixBank(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<MatrixBank>(info)
    {
        Utils::initializeClass<sc::MatrixBank>(this, info);

        matrices = new Vector<sc::Matrix2x3>(&parent->matrices);
        colorTransforms = new Vector<sc::ColorTransform>(&parent->colorTransforms);
    };

    /*
    ! Matrcies
    */
    Napi::Value MatrixBank::get_matrix(const Napi::CallbackInfo& info)
    {
        return matrices->get_item(info);
    }
    Napi::Value MatrixBank::insert_matrix(const Napi::CallbackInfo& info)
    {
        return matrices->insert_item(info, Matrix2x3::Unwrap(info[0].ToObject())->get_parent());
    }
    Napi::Value MatrixBank::remove_matrix(const Napi::CallbackInfo& info)
    {
        return matrices->remove_item(info);
    }
    Napi::Value MatrixBank::get_matrices_length(const Napi::CallbackInfo& info)
    {
        return matrices->get_length(info);
    }
    void MatrixBank::set_matrices_length(const Napi::CallbackInfo& info)
    {
        return matrices->set_length(info);
    }

    /*
    ! Colors
    */
    Napi::Value MatrixBank::get_color(const Napi::CallbackInfo& info)
    {
        return colorTransforms->get_item(info);
    }
    Napi::Value MatrixBank::insert_color(const Napi::CallbackInfo& info)
    {
        return colorTransforms->insert_item(info, ColorTransform::Unwrap(info[0].ToObject())->get_parent());
    }
    Napi::Value MatrixBank::remove_color(const Napi::CallbackInfo& info)
    {
        return colorTransforms->remove_item(info);
    }
    Napi::Value MatrixBank::get_colors_length(const Napi::CallbackInfo& info)
    {
        return colorTransforms->get_length(info);
    }
    void MatrixBank::set_colors_length(const Napi::CallbackInfo& info)
    {
        return colorTransforms->set_length(info);
    }
}