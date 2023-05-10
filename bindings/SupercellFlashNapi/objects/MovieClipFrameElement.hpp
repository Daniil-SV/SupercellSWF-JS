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
                        PROPERTY_ACCESSOR(scNapi::MovieClipFrameElement, instanceIndex),
                        PROPERTY_ACCESSOR(scNapi::MovieClipFrameElement, matrixIndex),
                        PROPERTY_ACCESSOR(scNapi::MovieClipFrameElement, colorTransformIndex)
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
        PROPERTY(instanceIndex)
            parent->instanceIndex = ToNativeValue<uint16_t>(value);
        PROPERTY_GET(instanceIndex)
            return ToJSValue(info, parent->instanceIndex);
        PROPERTY_END;


        PROPERTY(matrixIndex)
            parent->matrixIndex = ToNativeValue<uint16_t>(value);
        PROPERTY_GET(matrixIndex)
            return ToJSValue(info, parent->matrixIndex);
        PROPERTY_END;


        PROPERTY(colorTransformIndex)
            parent->colorTransformIndex = ToNativeValue<uint16_t>(value);
        PROPERTY_GET(colorTransformIndex)
            return ToJSValue(info, parent->colorTransformIndex);
        PROPERTY_END;

    };
}
