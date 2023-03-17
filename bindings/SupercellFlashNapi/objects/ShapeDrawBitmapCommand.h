#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"

namespace scNapi {
 class ShapeDrawBitmapCommandVertex: public Napi::ObjectWrap<ShapeDrawBitmapCommandVertex>, public LinkedObject<sc::ShapeDrawBitmapCommandVertex>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        ShapeDrawBitmapCommandVertex(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        void fromObject(Napi::Env&, Napi::Object object) override
        {
            if (object.Has("x"))
            {
                parent->x = ToNativeValue<float>(object.Get("x"));
            }
            if (object.Has("y"))
            {
                parent->y = ToNativeValue<float>(object.Get("y"));
            }
            if (object.Has("u"))
            {
                parent->u = ToNativeValue<float>(object.Get("u"));
            }
            if (object.Has("v"))
            {
                parent->v = ToNativeValue<float>(object.Get("v"));
            }
        }

    private:
        /* X-axis point position */
        void set_x(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_x(const Napi::CallbackInfo& info);

        /* Y-axis point position */
        void set_y(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_y(const Napi::CallbackInfo& info);

        /* X-axis uv position */
        void set_u(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_u(const Napi::CallbackInfo& info);

        /* Y-axis uv position */
        void set_v(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_v(const Napi::CallbackInfo& info);

    };


    class ShapeDrawBitmapCommand: public Napi::ObjectWrap<ShapeDrawBitmapCommand>, public LinkedObject<sc::ShapeDrawBitmapCommand>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        ShapeDrawBitmapCommand(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        void fromObject(Napi::Env& env, Napi::Object object) override
        {
            if (object.Has("textureIndex"))
            {
                parent->textureIndex(ToNativeValue<uint8_t>(object.Get("textureIndex")));
            }
            if (object.Has("vertices"))
            {
                Napi::Object vertexVector = object.Get("vertices").ToObject();
                for (Napi::Value value : Utils::IteratorData(env, vertexVector))
                {
                    parent->vertices.push_back(*(
                        scNapi::ShapeDrawBitmapCommandVertex::Unwrap(
                            value.As<Napi::Object>()
                        )->get_parent())
                    );
                }
            }
        }


    private:
        Vector<sc::ShapeDrawBitmapCommandVertex>* vertices = nullptr;
        
        /*
        & Texture index getter
        */

        void set_TextureIndex(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_TextureIndex(const Napi::CallbackInfo& info);

        /*
        ! Vertices
        */
        Napi::Value get_vertex(const Napi::CallbackInfo& info);
        Napi::Value insert_vertex(const Napi::CallbackInfo& info);
        Napi::Value remove_vertex(const Napi::CallbackInfo& info);
        Napi::Value get_vertices_length(const Napi::CallbackInfo& info);
        void set_vertices_length(const Napi::CallbackInfo& info);

    };
}