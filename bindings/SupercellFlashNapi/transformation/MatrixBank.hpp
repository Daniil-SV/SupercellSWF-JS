#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"
#include "Utils/Macros.h"

#include "Matrix2x3.hpp"
#include "ColorTransform.hpp"

using namespace node_binding;

namespace scNapi
{
    class MatrixBank: public Napi::ObjectWrap<MatrixBank>, public LinkedObject<sc::MatrixBank>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "MatrixBank",
                    {
                        VECTOR_ACCESSOR(MatrixBank, matrices),
                        VECTOR_ACCESSOR(MatrixBank, colorTransforms)
                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("MatrixBank", func);
        }

        MatrixBank(const Napi::CallbackInfo& info): Napi::ObjectWrap<MatrixBank>(info)
        {
            INITIALIZER(MatrixBank);
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object) override
        {
            VECTOR_PROPERTY_INIT(matrices, Matrix2x3);
            VECTOR_PROPERTY_INIT(colorTransforms, ColorTransform);
        }

    private:
        VECTOR(matrices, Matrix2x3);
        VECTOR(colorTransforms, ColorTransform);
    };
}
