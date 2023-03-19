#include "ColorTransform.h"

namespace scNapi
{
    void ColorTransform::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "ColorTransform",
                {
                    InstanceAccessor("alpha", &ColorTransform::get_Alpha, &ColorTransform::set_Alpha),

                    InstanceAccessor("redAdd", &ColorTransform::get_RedAdd, &ColorTransform::set_RedAdd),
                    InstanceAccessor("greenAdd", &ColorTransform::get_GreedAdd, &ColorTransform::set_GreedAdd),
                    InstanceAccessor("blueAdd", &ColorTransform::get_BlueAdd, &ColorTransform::set_BlueAdd),
                    InstanceAccessor("redMul", &ColorTransform::get_RedMul, &ColorTransform::set_RedMul),
                    InstanceAccessor("greenMul", &ColorTransform::get_GreedMul, &ColorTransform::set_GreedMul),
                    InstanceAccessor("blueMul", &ColorTransform::get_BlueMul, &ColorTransform::set_BlueMul),
                    InstanceMethod("equal", &ColorTransform::equal)
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

    Napi::Value ColorTransform::equal(const Napi::CallbackInfo& info)
    {
        sc::ColorTransform* color = ColorTransform::Unwrap(info[0].ToObject())->get_parent();

        if (color->alpha == parent->alpha && 
            color->blueAdd == parent->blueAdd &&
            color->blueMul == parent->blueMul &&
            color->greenAdd == parent->greenAdd &&
            color->greenMul == parent->greenMul &&
            color->redAdd == parent->redAdd &&
            color->redMul == parent->redMul) {
                return ToJSValue(info, true);
            }

        return ToJSValue(info, false);
    }

    /* Red add */
    void ColorTransform::set_RedAdd(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->redAdd = ToNativeValue<uint8_t>(value);
    }
    Napi::Value ColorTransform::get_RedAdd(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->redAdd);
    }

    /* Greed add */
    void ColorTransform::set_GreedAdd(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->greenAdd = ToNativeValue<uint8_t>(value);
    }
    Napi::Value ColorTransform::get_GreedAdd(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->greenAdd);
    }

    /* Blue add */
    void ColorTransform::set_BlueAdd(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->blueAdd = ToNativeValue<uint8_t>(value);
    }
    Napi::Value ColorTransform::get_BlueAdd(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->blueAdd);
    }

    /* Alpha */
    void ColorTransform::set_Alpha(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->alpha = ToNativeValue<float>(value);
    }
    Napi::Value ColorTransform::get_Alpha(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->alpha);
    }

    /* Red multiply */
    void ColorTransform::set_RedMul(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->redMul = ToNativeValue<float>(value);
    }
    Napi::Value ColorTransform::get_RedMul(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->redMul);
    }

    /* Greed multiply */
    void ColorTransform::set_GreedMul(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->greenMul = ToNativeValue<float>(value);
    }
    Napi::Value ColorTransform::get_GreedMul(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->greenMul);
    }

    /* Blue multiply */
    void ColorTransform::set_BlueMul(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->blueMul = ToNativeValue<float>(value);
    }
    Napi::Value ColorTransform::get_BlueMul(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->blueMul);
    }
}