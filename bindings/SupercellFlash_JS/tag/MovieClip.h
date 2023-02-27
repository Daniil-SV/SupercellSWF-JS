#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

#include "Utils/Utils.hpp"

namespace scNapi
{
    class MovieClipFrame: public Napi::ObjectWrap<MovieClipFrame>, public ScObject<sc::MovieClipFrame>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        MovieClipFrame(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        sc::MovieClipFrame* get_parent() override
        {
            return parent;
        };

        void set_parent(sc::MovieClipFrame* item) override
        {
            parent = item;
        };

        void new_parent() override
        {
            parent = new sc::MovieClipFrame();
        }

        void fromObject(Napi::Env&, Napi::Object object) override
        {
            if (object.Has("elementsCount")) {
                parent->elementsCount = ToNativeValue<uint16_t>(object.Get(("elementsCount")));
            }

            if (object.Has("label")) {
                parent->label = ToNativeValue<std::string>(object.Get("label"));
            }
        }

    private:
        sc::MovieClipFrame* parent = nullptr; // Pointer to object that this class is attached to

        /* 
        & ElementsCount
        */
        void set_ElementsCount(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_ElementsCount(const Napi::CallbackInfo& info);

        /* 
        & Label
        */
        void set_Label(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Label(const Napi::CallbackInfo& info);


    };

    class MovieClipFrameElement: public Napi::ObjectWrap<MovieClipFrameElement>, public ScObject<sc::MovieClipFrameElement>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        MovieClipFrameElement(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        sc::MovieClipFrameElement* get_parent() override
        {
            return parent;
        };

        void set_parent(sc::MovieClipFrameElement* item) override
        {
            parent = item;
        };

        void new_parent() override
        {
            parent = new sc::MovieClipFrameElement();
        }

        void fromObject(Napi::Env& env, Napi::Object object) override
        {
            if (object.Has("instanceIndex")) {
                parent->instanceIndex = ToNativeValue<uint16_t>(object.Get("instanceIndex"));
            }

            if (object.Has("matrixIndex")) {
                parent->matrixIndex = ToNativeValue<uint16_t>(object.Get("matrixIndex"));
            }

            if (object.Has("colorTransformIndex")) {
                parent->colorTransformIndex = ToNativeValue<uint16_t>(object.Get("colorTransformIndex"));
            }
        }

    private:
        sc::MovieClipFrameElement* parent = nullptr; // Pointer to object that this class is attached to

        /* 
        & InstanceIndex
        */
        void set_InstanceIndex(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_InstanceIndex(const Napi::CallbackInfo& info);

        /* 
        & MatrixIndex
        */
        void set_MatrixIndex(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_MatrixIndex(const Napi::CallbackInfo& info);

        /* 
        & ColorTransformIndex
        */
        void set_ColorTransformIndex(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_ColorTransformIndex(const Napi::CallbackInfo& info);

    };

    class DisplayObjectInstance: public Napi::ObjectWrap<DisplayObjectInstance>, public ScObject<sc::DisplayObjectInstance>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        DisplayObjectInstance(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        sc::DisplayObjectInstance* get_parent() override
        {
            return parent;
        };

        void set_parent(sc::DisplayObjectInstance* item) override
        {
            parent = item;
        };

        void new_parent() override
        {
            parent = new sc::DisplayObjectInstance();
        }

        void fromObject(Napi::Env& env, Napi::Object object) override
        {
            if (object.Has("id")){
                parent->id = ToNativeValue<uint16_t>(object.Get("id"));
            }

            if (object.Has("blend")){
                parent->blend = ToNativeValue<uint8_t>(object.Get("blend"));
            }

            if (object.Has("name")){
                parent->name = ToNativeValue<std::string>(object.Get("name"));
            }
        }

    private:
        sc::DisplayObjectInstance* parent = nullptr; // Pointer to object that this class is attached to

        /* 
        & id
        */
        void set_id(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_id(const Napi::CallbackInfo& info);

        /* 
        & Blend
        */
        void set_Blend(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Blend(const Napi::CallbackInfo& info);


        /* 
        & Name
        */
        void set_Name(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_Name(const Napi::CallbackInfo& info);
    };

    class MovieClip: public Napi::ObjectWrap<MovieClip>, public ScObject<sc::MovieClip>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        MovieClip(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        sc::MovieClip* get_parent() override
        {
            return parent;
        };

        void set_parent(sc::MovieClip* item) override
        {
            parent = item;
        };

        void new_parent() override
        {
            parent = new sc::MovieClip();
        }

        void fromObject(Napi::Env& env, Napi::Object object) override
        {
            // TODO
        }

    private:
        // Vector<sc::ShapeDrawBitmapCommand>* commands = nullptr;
        sc::MovieClip* parent = nullptr; // Pointer to object that this class is attached to

        /* 
        & FrameRate
        */
        void set_FrameRate(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_FrameRate(const Napi::CallbackInfo& info);

        /* 
        & ScalingGrid
        */
        void set_ScalingGrid(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_ScalingGrid(const Napi::CallbackInfo& info);
    };
}