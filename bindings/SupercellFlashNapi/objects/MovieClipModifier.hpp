#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"
#include "Utils/Macros.h"

namespace scNapi
{
    class MovieClipModifier : public Napi::ObjectWrap<MovieClipModifier>, public LinkedObject<sc::MovieClipModifier>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            const std::string className =
                "MovieClipModifier";

            Napi::Function func =
                DefineClass(env, className.c_str(),
                    {
                        PROPERTY_ACCESSOR(scNapi::MovieClipModifier, id),
                        PROPERTY_ACCESSOR(scNapi::MovieClipModifier, type)
                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set(className, func);
        }

        MovieClipModifier(const Napi::CallbackInfo& info)
            : Napi::ObjectWrap<MovieClipModifier>(info)
        {
            INITIALIZER(MovieClipModifier)
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object) override
        {
            PROPERTY_INIT(id);
            PROPERTY_INIT(type);
        }

    private:
        PROPERTY(id)
            parent->id(ToNativeValue<uint16_t>(value));
        PROPERTY_GET(id)
            return ToJSValue(info, parent->id());
        PROPERTY_END;


        PROPERTY(type)
            parent->type((sc::MovieClipModifier::Type)ToNativeValue<uint8_t>(value));
        PROPERTY_GET(type)
            return ToJSValue(info, (uint8_t)parent->type());
        PROPERTY_END;
    };
}