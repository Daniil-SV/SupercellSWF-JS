#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"

#include "MovieClipFrame.h"

namespace scNapi
{
    class MovieClipFrameElement: public Napi::ObjectWrap<MovieClipFrameElement>, public LinkedObject<sc::MovieClipFrameElement>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        MovieClipFrameElement(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        void fromObject(Napi::Env env, Napi::Object object) override
        {
            if (object.Has("instanceIndex"))
            {
                parent->instanceIndex = ToNativeValue<uint16_t>(object.Get("instanceIndex"));
            }

            if (object.Has("matrixIndex"))
            {
                parent->matrixIndex = ToNativeValue<uint16_t>(object.Get("matrixIndex"));
            }

            if (object.Has("colorTransformIndex"))
            {
                parent->colorTransformIndex = ToNativeValue<uint16_t>(object.Get("colorTransformIndex"));
            }
        }

    private:
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

    class DisplayObjectInstance: public Napi::ObjectWrap<DisplayObjectInstance>, public LinkedObject<sc::DisplayObjectInstance>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        DisplayObjectInstance(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        void fromObject(Napi::Env env, Napi::Object object) override
        {
            if (object.Has("id"))
            {
                parent->id = ToNativeValue<uint16_t>(object.Get("id"));
            }

            if (object.Has("blend"))
            {
                parent->blend = ToNativeValue<uint8_t>(object.Get("blend"));
            }

            if (object.Has("name"))
            {
                parent->name = ToNativeValue<std::string>(object.Get("name"));
            }
        }

    private:
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

    class MovieClip: public Napi::ObjectWrap<MovieClip>, public LinkedObject<sc::MovieClip>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        MovieClip(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        void fromObject(Napi::Env env, Napi::Object object) override
        {
            if (object.Has("id"))
            {
                parent->id(ToNativeValue<uint16_t>(object.Get("id")));
            }

            if (object.Has("frameRate"))
            {
                parent->frameRate(ToNativeValue<uint8_t>(object.Get("frameRate")));
            }

            if (object.Has("scalingGrid"))
            {
                Napi::Object grid = object.Get("scalingGrid").As<Napi::Object>();
                sc::ScalingGrid* nativeGrid = new sc::ScalingGrid();

                nativeGrid->x = ToNativeValue<float>(grid.Get("x"));
                nativeGrid->y = ToNativeValue<float>(grid.Get("y"));
                nativeGrid->width = ToNativeValue<float>(grid.Get("width"));
                nativeGrid->height = ToNativeValue<float>(grid.Get("height"));

                parent->scalingGrid(nativeGrid);

            }

            if (object.Has("matrixBankIndex"))
            {
                parent->matrixBankIndex(ToNativeValue<uint8_t>(object.Get("matrixBankIndex")));
            }

            if (object.Has("frameElements"))
            {
                Napi::Object elementsVector = object.Get("frameElements").ToObject();
                for (Napi::Value value : Utils::IteratorData(env, elementsVector))
                {
                    parent->frameElements.push_back(*(
                        scNapi::MovieClipFrameElement::Unwrap(
                            value.As<Napi::Object>()
                        )->get_parent())
                    );
                }
            }

            if (object.Has("instances"))
            {
                Napi::Object instancesVector = object.Get("instances").ToObject();
                for (Napi::Value value : Utils::IteratorData(env, instancesVector))
                {
                    parent->instances.push_back(*(
                        scNapi::DisplayObjectInstance::Unwrap(
                            value.As<Napi::Object>()
                        )->get_parent())
                    );
                }
            }

            if (object.Has("frames"))
            {
                Napi::Object framesVector = object.Get("frames").ToObject();
                for (Napi::Value value : Utils::IteratorData(env, framesVector))
                {
                    parent->frames.push_back(*(
                        scNapi::MovieClipFrame::Unwrap(
                            value.As<Napi::Object>()
                        )->get_parent())
                    );
                }
            }
        }

    private:
        Vector<sc::MovieClipFrameElement>* frameElements = nullptr;
        Vector<sc::DisplayObjectInstance>* instances = nullptr;
        Vector<sc::MovieClipFrame>* frames = nullptr;

        /*
        & Id
        */
        void set_id(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_id(const Napi::CallbackInfo& info);

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

        /*
        & MatrixBankIndex
        */
        void set_MatrixBankIndex(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_MatrixBankIndex(const Napi::CallbackInfo& info);

        /*
        ! frameElements Array
        */
        Napi::Value get_element(const Napi::CallbackInfo& info);
        Napi::Value insert_element(const Napi::CallbackInfo& info);
        Napi::Value remove_element(const Napi::CallbackInfo& info);
        Napi::Value get_elements_length(const Napi::CallbackInfo& info);
        void set_elements_length(const Napi::CallbackInfo& info);

        /*
        ! frameElements Array
        */
        Napi::Value get_instance(const Napi::CallbackInfo& info);
        Napi::Value insert_instance(const Napi::CallbackInfo& info);
        Napi::Value remove_instance(const Napi::CallbackInfo& info);
        Napi::Value get_instances_length(const Napi::CallbackInfo& info);
        void set_instances_length(const Napi::CallbackInfo& info);

        /*
        ! Frames Array
        */
        Napi::Value get_frame(const Napi::CallbackInfo& info);
        Napi::Value insert_frame(const Napi::CallbackInfo& info);
        Napi::Value remove_frame(const Napi::CallbackInfo& info);
        Napi::Value get_frames_length(const Napi::CallbackInfo& info);
        void set_frames_length(const Napi::CallbackInfo& info);
    };
}