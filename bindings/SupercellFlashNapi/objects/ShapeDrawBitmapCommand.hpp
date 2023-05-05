#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"
#include "Utils/Macros.h"

#include "ShapeDrawBitmapVertex.hpp"

namespace scNapi {
    class ShapeDrawBitmapCommand: public Napi::ObjectWrap<ShapeDrawBitmapCommand>, public LinkedObject<sc::ShapeDrawBitmapCommand>
    {
    public:
        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "ShapeDrawBitmapCommand",
                    {
                        PROPERTY_ACCESSOR(scNapi::ShapeDrawBitmapCommand, textureIndex),
                        VECTOR_ACCESSOR(ShapeDrawBitmapCommand, vertices)
                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("ShapeDrawBitmapCommand", func);
        }

        inline static Napi::FunctionReference constructor;

        ShapeDrawBitmapCommand(const Napi::CallbackInfo& info): Napi::ObjectWrap<ShapeDrawBitmapCommand>(info)
        {
            INITIALIZER(ShapeDrawBitmapCommand);
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object) override
        {
            PROPERTY_INIT(textureIndex);
            VECTOR_PROPERTY_INIT(vertices, ShapeDrawBitmapCommandVertex);
        }

    private:
        PROPERTY(textureIndex, uint16_t);
        VECTOR(vertices, ShapeDrawBitmapCommandVertex);
    };
}