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
        PROPERTY_DEF(alpha);
        PROPERTY_DEF(redAdd);
        PROPERTY_DEF(greenAdd);
        PROPERTY_DEF(blueAdd);
        PROPERTY_DEF(redMul);
        PROPERTY_DEF(greenMul);
        PROPERTY_DEF(blueMul);
    };
}
