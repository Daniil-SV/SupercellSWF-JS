#include "Matrix2x3.h"

namespace scNapi
{
    void Matrix2x3::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "Matrix2x3",
                {
                    InstanceAccessor("a", &Matrix2x3::get_a, &Matrix2x3::set_a),
                    InstanceAccessor("b", &Matrix2x3::get_b, &Matrix2x3::set_b),
                    InstanceAccessor("c", &Matrix2x3::get_c, &Matrix2x3::set_c),
                    InstanceAccessor("d", &Matrix2x3::get_d, &Matrix2x3::set_d),
                    InstanceAccessor("tx", &Matrix2x3::get_tx, &Matrix2x3::set_tx),
                    InstanceAccessor("ty", &Matrix2x3::get_ty, &Matrix2x3::set_ty),
                    InstanceMethod("equal", &Matrix2x3::equal)
                });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("Matrix2x3", func);
    }

    Napi::FunctionReference Matrix2x3::constructor;
    Matrix2x3::Matrix2x3(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<Matrix2x3>(info)
    {
        Utils::initializeClass(this, info);
    };

    Napi::Value Matrix2x3::equal(const Napi::CallbackInfo& info) {
        sc::Matrix2x3* matrix = Matrix2x3::Unwrap(info[0].ToObject())->get_parent();

        if (floatEqual(parent->a, matrix->a) &&
            floatEqual(parent->b, matrix->b) &&
            floatEqual(parent->c, matrix->c) &&
            floatEqual(parent->d, matrix->d) &&
            floatEqual(parent->tx, matrix->tx) &&
            floatEqual(parent->ty, matrix->ty)) {
                return ToJSValue(info, true);
            }

        return ToJSValue(info, false);
    }

    /*
    & X scew
     */
    void Matrix2x3::set_a(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->a = ToNativeValue<float>(value);
    }
    Napi::Value Matrix2x3::get_a(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->a);
    }

    /*
    & X scale
     */
    void Matrix2x3::set_b(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->b = ToNativeValue<float>(value);
    }
    Napi::Value Matrix2x3::get_b(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->b);
    }

    /*
    & Y scale
     */
    void Matrix2x3::set_c(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->c = ToNativeValue<float>(value);
    }
    Napi::Value Matrix2x3::get_c(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->c);
    }

    /*
    & Y scew
     */
    void Matrix2x3::set_d(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->d = ToNativeValue<float>(value);
    }
    Napi::Value Matrix2x3::get_d(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->d);
    }

    /*
    & X Translation
     */
    void Matrix2x3::set_tx(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->tx = ToNativeValue<float>(value);
    }
    Napi::Value Matrix2x3::get_tx(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->tx);
    }

    /*
    & Y Translation
     */
    void Matrix2x3::set_ty(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->ty = ToNativeValue<float>(value);
    }
    Napi::Value Matrix2x3::get_ty(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->ty);
    }
}