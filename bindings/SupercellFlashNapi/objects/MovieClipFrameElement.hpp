#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"
#include "Utils/Macros.h"

using namespace node_binding;

namespace scNapi
{
    class MovieClipFrameElement: public Napi::ObjectWrap<MovieClipFrameElement>, public LinkedObject<sc::MovieClipFrameElement>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "MovieClipFrameElement",
                    {
                        PROPERTY_ACCESSOR(instanceIndex),
                        PROPERTY_ACCESSOR(matrixIndex),
                        PROPERTY_ACCESSOR(colorTransformIndex)
                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("MovieClipFrameElement", func);
        }

        MovieClipFrameElement(const Napi::CallbackInfo& info): Napi::ObjectWrap<MovieClipFrameElement>(info)
        {
            INITIALIZER(MovieClipFrameElement);
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object) override
        {
           PROPERTY_INIT(instanceIndex);
           PROPERTY_INIT(matrixIndex);
           PROPERTY_INIT(colorTransformIndex);
        }

    private:
        COMMON_PROPERTY(instanceIndex, uint16_t);
        COMMON_PROPERTY(matrixIndex, uint16_t);
        COMMON_PROPERTY(colorTransformIndex, uint16_t);
    };
}
