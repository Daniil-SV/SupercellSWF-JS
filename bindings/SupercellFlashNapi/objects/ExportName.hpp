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
    class ExportName : public Napi::ObjectWrap<ExportName>, public LinkedObject<sc::ExportName>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "ExportName",
                    {
                        PROPERTY_ACCESSOR(scNapi::ExportName, id),
                        PROPERTY_ACCESSOR(scNapi::ExportName, name)
                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("ExportName", func);
        }

        ExportName(const Napi::CallbackInfo& info) : Napi::ObjectWrap<ExportName>(info)
        {
            INITIALIZER(ExportName);
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object)
        {
            PROPERTY_INIT(id);
            PROPERTY_INIT(name);

        }

    private:
        PROPERTY(id)
            parent->id(ToNativeValue<uint16_t>(value));
        PROPERTY_GET(id)
            return ToJSValue(info, parent->id());
        PROPERTY_END;

        PROPERTY(name)
            parent->name(ToNativeValue<string>(value));
        PROPERTY_GET(name)
            return ToJSValue(info, parent->name());
        PROPERTY_END;

    };
}
