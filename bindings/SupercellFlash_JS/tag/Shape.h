#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

#include "Utils/Utils.hpp"
#include "ShapeDrawBitmapCommand.h"

namespace scNapi
{
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
                parent->id(ToNativeValue<uint16_t>(object.Get("id")));
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