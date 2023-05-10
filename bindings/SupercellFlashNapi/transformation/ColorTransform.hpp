#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"
#include "Utils/Macros.h"

using namespace node_binding;

namespace scNapi
{
    class ColorTransform: public Napi::ObjectWrap<ColorTransform>, public LinkedObject<sc::ColorTransform>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "ColorTransform",
                    {
                        PROPERTY_ACCESSOR(scNapi::ColorTransform, alpha),
                        PROPERTY_ACCESSOR(scNapi::ColorTransform, redAdd),
                        PROPERTY_ACCESSOR(scNapi::ColorTransform, greenAdd),
                        PROPERTY_ACCESSOR(scNapi::ColorTransform, blueAdd),
                        PROPERTY_ACCESSOR(scNapi::ColorTransform, redMul),
                        PROPERTY_ACCESSOR(scNapi::ColorTransform, greenMul),
                        PROPERTY_ACCESSOR(scNapi::ColorTransform, blueMul)
                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("ColorTransform", func);
        }

        ColorTransform(const Napi::CallbackInfo& info): Napi::ObjectWrap<ColorTransform>(info)
        {
            INITIALIZER(ColorTransform);
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object) override
        {
            PROPERTY_INIT(alpha);
            PROPERTY_INIT(redAdd);
            PROPERTY_INIT(greenAdd);
            PROPERTY_INIT(blueAdd);
            PROPERTY_INIT(redMul);
            PROPERTY_INIT(greenMul);
            PROPERTY_INIT(blueMul);
        }

    private:
        PROPERTY(alpha)
            parent->alpha = ToNativeValue<float>(value);
        PROPERTY_GET(alpha)
            return ToJSValue(info, parent->alpha);
        PROPERTY_END;


        PROPERTY(redAdd)
            parent->redAdd = ToNativeValue<uint8_t>(value);
        PROPERTY_GET(redAdd)
            return ToJSValue(info, parent->redAdd);
        PROPERTY_END;

        PROPERTY(greenAdd)
            parent->greenAdd = ToNativeValue<uint8_t>(value);
        PROPERTY_GET(greenAdd)
            return ToJSValue(info, parent->greenAdd);
        PROPERTY_END;

        PROPERTY(blueAdd)
            parent->blueAdd = ToNativeValue<uint8_t>(value);
        PROPERTY_GET(blueAdd)
            return ToJSValue(info, parent->blueAdd);
        PROPERTY_END;


        PROPERTY(redMul)
            parent->redMul = ToNativeValue<float>(value);
        PROPERTY_GET(redMul)
            return ToJSValue(info, parent->redMul);
        PROPERTY_END;

        PROPERTY(greenMul)
            parent->greenMul = ToNativeValue<float>(value);
        PROPERTY_GET(greenMul)
            return ToJSValue(info, parent->greenMul);
        PROPERTY_END;

        PROPERTY(blueMul)
            parent->blueMul = ToNativeValue<float>(value);
        PROPERTY_GET(blueMul)
            return ToJSValue(info, parent->blueMul);
        PROPERTY_END;
    };
}
