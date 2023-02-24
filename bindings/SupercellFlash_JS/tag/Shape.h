#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

#include "Utils/Utils.hpp"
#include "iostream"

namespace scNapi
{
    class ShapeDrawBitmapCommandVertex: public Napi::ObjectWrap<ShapeDrawBitmapCommandVertex>, public ScObject<sc::ShapeDrawBitmapCommandVertex>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        ShapeDrawBitmapCommandVertex(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        sc::ShapeDrawBitmapCommandVertex* get_parent() override
        {
            return parent;
        };

        void set_parent(sc::ShapeDrawBitmapCommandVertex* item) override
        {
            parent = item;
        };

        void new_parent() override
        {
            parent = new sc::ShapeDrawBitmapCommandVertex();
        }

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
        sc::ShapeDrawBitmapCommandVertex* parent = nullptr; // Pointer to object that this class is attached to

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


    class ShapeDrawBitmapCommand: public Napi::ObjectWrap<ShapeDrawBitmapCommand>, public ScObject<sc::ShapeDrawBitmapCommand>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        ShapeDrawBitmapCommand(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        sc::ShapeDrawBitmapCommand* get_parent() override
        {
            return parent;
        };

        void set_parent(sc::ShapeDrawBitmapCommand* item) override
        {
            parent = item;
        };

        void new_parent() override
        {
            parent = new sc::ShapeDrawBitmapCommand();
        }

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
        sc::ShapeDrawBitmapCommand* parent = nullptr; // Pointer to object that this class is attached to

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


    class Shape: public Napi::ObjectWrap<Shape>, public ScObject<sc::Shape>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        Shape(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        sc::Shape* get_parent() override
        {
            return parent;
        };

        void set_parent(sc::Shape* item) override
        {
            parent = item;
        };

        void new_parent() override
        {
            parent = new sc::Shape();
        }

        void fromObject(Napi::Env& env, Napi::Object object) override
        {
            if (object.Has("id"))
            {
                //parent->id(ToNativeValue<bool>(object.Get("id")));
            }

            if (object.Has("commands"))
            {
                Napi::Object commandVector = object.Get("commands").ToObject();
                for (Napi::Value value : Utils::IteratorData(env, commandVector))
                {
                    parent->commands.push_back(*(
                        scNapi::ShapeDrawBitmapCommand::Unwrap(
                            value.As<Napi::Object>()
                        )->get_parent())
                    );
                }
            }
        }

    private:
        Vector<sc::ShapeDrawBitmapCommand>* commands = nullptr;
        sc::Shape* parent = nullptr; // Pointer to object that this class is attached to

        /* Id */
        void set_id(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_id(const Napi::CallbackInfo& info);

        /*
        ! Bitmaps
        */
        Napi::Value get_command(const Napi::CallbackInfo& info);
        Napi::Value insert_command(const Napi::CallbackInfo& info);
        Napi::Value remove_command(const Napi::CallbackInfo& info);
        Napi::Value get_commands_length(const Napi::CallbackInfo& info);
        void set_commands_length(const Napi::CallbackInfo& info);

    };
}