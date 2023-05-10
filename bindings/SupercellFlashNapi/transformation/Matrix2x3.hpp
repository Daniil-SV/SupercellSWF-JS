#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"
#include "Utils/Macros.h"

using namespace node_binding;

namespace scNapi
{
    class Matrix2x3: public Napi::ObjectWrap<Matrix2x3>, public LinkedObject<sc::Matrix2x3>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "Matrix2x3",
                    {
                        PROPERTY_ACCESSOR(scNapi::Matrix2x3, a),
                        PROPERTY_ACCESSOR(scNapi::Matrix2x3, b),
                        PROPERTY_ACCESSOR(scNapi::Matrix2x3, c),
                        PROPERTY_ACCESSOR(scNapi::Matrix2x3, d),
                        PROPERTY_ACCESSOR(scNapi::Matrix2x3, tx),
                        PROPERTY_ACCESSOR(scNapi::Matrix2x3, ty),
                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("Matrix2x3", func);
        }

        Matrix2x3(const Napi::CallbackInfo& info): Napi::ObjectWrap<Matrix2x3>(info)
        {
            INITIALIZER(Matrix2x3);
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object) override
        {
            PROPERTY_INIT(a);
            PROPERTY_INIT(b);
            PROPERTY_INIT(c);
            PROPERTY_INIT(d);
            PROPERTY_INIT(tx);
            PROPERTY_INIT(ty);
        }

    private:
        PROPERTY(a)
            parent->a = ToNativeValue<float>(value);
        PROPERTY_GET(a)
            return ToJSValue(info, parent->a);
        PROPERTY_END;

        PROPERTY(b)
            parent->b = ToNativeValue<float>(value);
        PROPERTY_GET(b)
            return ToJSValue(info, parent->b);
        PROPERTY_END;

        PROPERTY(c)
            parent->c = ToNativeValue<float>(value);
        PROPERTY_GET(c)
            return ToJSValue(info, parent->c);
        PROPERTY_END;

        PROPERTY(d)
            parent->d = ToNativeValue<float>(value);
        PROPERTY_GET(d)
            return ToJSValue(info, parent->d);
        PROPERTY_END;

        PROPERTY(tx)
            parent->tx = ToNativeValue<float>(value);
        PROPERTY_GET(tx)
            return ToJSValue(info, parent->tx);
        PROPERTY_END;

        PROPERTY(ty)
            parent->ty = ToNativeValue<float>(value);
        PROPERTY_GET(ty)
            return ToJSValue(info, parent->ty);
        PROPERTY_END;

    };
}
