#include "ColorTransform.h"

namespace scNapi
{
    void ColorTransform::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "ColorTransform",
                {
                    InstanceAccessor("redAdd", &ColorTransform::get_RedAdd, &ColorTransform::set_RedAdd),
                    InstanceAccessor("greenAdd", &ColorTransform::get_GreedAdd, &ColorTransform::set_GreedAdd),
                    InstanceAccessor("blueAdd", &ColorTransform::get_BlueAdd, &ColorTransform::set_BlueAdd),

                    InstanceAccessor("alphaMul", &ColorTransform::get_AlphaMul, &ColorTransform::set_AlphaMul),
                    InstanceAccessor("redMul", &ColorTransform::get_RedMul, &ColorTransform::set_RedMul),
                    InstanceAccessor("greenMul", &ColorTransform::get_GreedMul, &ColorTransform::set_GreedMul),
                    InstanceAccessor("blueMul", &ColorTransform::get_BlueMul, &ColorTransform::set_BlueMul)
                });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("ColorTransform", func);
    }

    Napi::FunctionReference ColorTransform::constructor;
    ColorTransform::ColorTransform(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<ColorTransform>(info)
    {
        Utils::initializeClass(this, info);
    };

    /* Red add */
    void ColorTransform::set_RedAdd(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->redAdd = ToNativeValue<uint8_t>(value);
    }
    Napi::Value ColorTransform::get_RedAdd(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->redAdd);
    }

    /* Greed add */
    void ColorTransform::set_GreedAdd(const Napi::CallbackInfo& info, const Napi::Value& value){
        parent->greenAdd = ToNativeValue<uint8_t>(value);
    }
    Napi::Value ColorTransform::get_GreedAdd(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->greenAdd);
    }

    /* Blue add */
    void ColorTransform::set_BlueAdd(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->blueAdd = ToNativeValue<uint8_t>(value);
    }
    Napi::Value ColorTransform::get_BlueAdd(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->blueAdd);
    }

    /* Alpha multiply */
    void ColorTransform::set_AlphaMul(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->alphaMul = ToNativeValue<float>(value);
    }
    Napi::Value ColorTransform::get_AlphaMul(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->alphaMul);
    }

    /* Red multiply */
    void ColorTransform::set_RedMul(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->redMul = ToNativeValue<float>(value);
    }
    Napi::Value ColorTransform::get_RedMul(const Napi::CallbackInfo& info){
        return ToJSValue(info, parent->redMul);
    }

    /* Greed multiply */
    void ColorTransform::set_GreedMul(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->greenMul = ToNativeValue<float>(value);
    }
    Napi::Value ColorTransform::get_GreedMul(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->greenMul);
    }

    /* Blue multiply */
    void ColorTransform::set_BlueMul(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->blueMul = ToNativeValue<float>(value);
    }
    Napi::Value ColorTransform::get_BlueMul(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->blueMul);
    }
}