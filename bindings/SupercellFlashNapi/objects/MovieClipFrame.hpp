#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"
#include "Utils/Macros.h"

using namespace node_binding;
using namespace std;

namespace scNapi
{
    class MovieClipFrame: public Napi::ObjectWrap<MovieClipFrame>, public LinkedObject<sc::MovieClipFrame>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "MovieClipFrame",
                    {
                        PROPERTY_ACCESSOR(scNapi::MovieClipFrame, label),
                        PROPERTY_ACCESSOR(scNapi::MovieClipFrame, elementsCount)
                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("MovieClipFrame", func);
        }

        MovieClipFrame(const Napi::CallbackInfo& info): Napi::ObjectWrap<MovieClipFrame>(info)
        {
            INITIALIZER(MovieClipFrame);
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object) override
        {
            PROPERTY_INIT(label);
            PROPERTY_INIT(elementsCount);
        }

    private:
        PROPERTY(label)
            parent->label(ToNativeValue<string>(value));
        PROPERTY_GET(label)
            return ToJSValue(info, parent->label());
        PROPERTY_END;


        PROPERTY(elementsCount)
            parent->elementsCount(ToNativeValue<uint32_t>(value));
        PROPERTY_GET(elementsCount)
            return ToJSValue(info, parent->elementsCount());
        PROPERTY_END;
    };
}
