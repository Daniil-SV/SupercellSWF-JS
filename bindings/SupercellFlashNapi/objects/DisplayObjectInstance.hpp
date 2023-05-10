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
    class DisplayObjectInstance : public Napi::ObjectWrap<DisplayObjectInstance>, public LinkedObject<sc::DisplayObjectInstance>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "DisplayObjectInstance",
                    {
                        PROPERTY_ACCESSOR(scNapi::DisplayObjectInstance, id),
                        PROPERTY_ACCESSOR(scNapi::DisplayObjectInstance, blend),
                        PROPERTY_ACCESSOR(scNapi::DisplayObjectInstance, name)
                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("DisplayObjectInstance", func);
        }

        DisplayObjectInstance(const Napi::CallbackInfo& info) : Napi::ObjectWrap<DisplayObjectInstance>(info)
        {
            INITIALIZER(DisplayObjectInstance);
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object) override
        {
            PROPERTY_INIT(id);
            PROPERTY_INIT(blend);
            PROPERTY_INIT(name);
        }

    private:
        PROPERTY(id)
            parent->id = ToNativeValue<uint16_t>(value);
        PROPERTY_GET(id)
            return ToJSValue(info, parent->id);
        PROPERTY_END;

        PROPERTY(blend)
            parent->blend = ToNativeValue<uint8_t>(value);
        PROPERTY_GET(blend)
            return ToJSValue(info, parent->blend);
        PROPERTY_END;

        PROPERTY(name)
            parent->name = ToNativeValue<string>(value);
        PROPERTY_GET(name)
            return ToJSValue(info, parent->name);
        PROPERTY_END;

    };
}
