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
                        PROPERTY_ACCESSOR(a),
                        PROPERTY_ACCESSOR(b),
                        PROPERTY_ACCESSOR(c),
                        PROPERTY_ACCESSOR(d),
                        PROPERTY_ACCESSOR(tx),
                        PROPERTY_ACCESSOR(ty),
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
        COMMON_PROPERTY(a, float);
        COMMON_PROPERTY(b, float);
        COMMON_PROPERTY(c, float);
        COMMON_PROPERTY(d, float);
        COMMON_PROPERTY(tx, float);
        COMMON_PROPERTY(ty, float);
    };
}
