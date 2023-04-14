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
                        PROPERTY_ACCESSOR(alpha),
                        PROPERTY_ACCESSOR(redAdd),
                        PROPERTY_ACCESSOR(greenAdd),
                        PROPERTY_ACCESSOR(blueAdd),
                        PROPERTY_ACCESSOR(redMul),
                        PROPERTY_ACCESSOR(greenMul),
                        PROPERTY_ACCESSOR(blueMul)
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
        COMMON_PROPERTY(alpha, float);

        COMMON_PROPERTY(redAdd, uint8_t);
        COMMON_PROPERTY(greenAdd, uint8_t);
        COMMON_PROPERTY(blueAdd, uint8_t);

        COMMON_PROPERTY(redMul, float);
        COMMON_PROPERTY(greenMul, float);
        COMMON_PROPERTY(blueMul, float);
    };
}
