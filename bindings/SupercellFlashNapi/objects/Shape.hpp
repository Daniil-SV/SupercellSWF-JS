#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"
#include "Utils/Macros.h"

#include "ShapeDrawBitmapCommand.hpp"

namespace scNapi
{
    class Shape: public Napi::ObjectWrap<Shape>, public LinkedObject<sc::Shape>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "Shape",
                    {
                        PROPERTY_ACCESSOR(scNapi::Shape, id),
                        VECTOR_ACCESSOR(Shape, commands)
                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("Shape", func);
        }

        Shape(const Napi::CallbackInfo& info): Napi::ObjectWrap<Shape>(info)
        {
            INITIALIZER(Shape);
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object) override
        {
            PROPERTY_INIT(id);
            VECTOR_PROPERTY_INIT(commands, ShapeDrawBitmapCommand);
        }

    private:
        PROPERTY(id)
            parent->id(ToNativeValue<uint16_t>(value));
        PROPERTY_GET(id)
            return ToJSValue(info, parent->id());
        PROPERTY_END;


        VECTOR(commands, ShapeDrawBitmapCommand);
    };
}