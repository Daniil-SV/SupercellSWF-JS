#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"
#include "Utils/Macros.h"

#include "MovieClipFrameElement.hpp"
#include "DisplayObjectInstance.hpp"
#include "MovieClipFrame.hpp"

using namespace node_binding;

namespace scNapi
{
    class MovieClip: public Napi::ObjectWrap<MovieClip>, public LinkedObject<sc::MovieClip>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "MovieClip",
                    {
                        PROPERTY_ACCESSOR(id),
                        PROPERTY_ACCESSOR(frameRate),
                        PROPERTY_ACCESSOR(matrixBankIndex),
                        PROPERTY_ACCESSOR(unknownFlag),
                        PROPERTY_ACCESSOR(scalingGrid),
                        VECTOR_ACCESSOR(MovieClip, frameElements),
                        VECTOR_ACCESSOR(MovieClip, instances),
                        VECTOR_ACCESSOR(MovieClip, frames)

                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("MovieClip", func);
        }

        MovieClip(const Napi::CallbackInfo& info): Napi::ObjectWrap<MovieClip>(info)
        {
            INITIALIZER(MovieClip);
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object) override
        {
            PROPERTY_INIT(id);
            PROPERTY_INIT(frameRate);
            PROPERTY_INIT(matrixBankIndex);
            PROPERTY_INIT(unknownFlag);
            PROPERTY_INIT(scalingGrid);

            VECTOR_PROPERTY_INIT(frameElements, MovieClipFrameElement);
            VECTOR_PROPERTY_INIT(instances, DisplayObjectInstance);
            VECTOR_PROPERTY_INIT(frames, MovieClipFrame);
        }

    private:
        PROPERTY(id, uint16_t);
        PROPERTY(unknownFlag, bool);
        PROPERTY(frameRate, uint8_t);
        PROPERTY(matrixBankIndex, uint8_t);

        VECTOR(frameElements, MovieClipFrameElement);
        VECTOR(instances, DisplayObjectInstance);
        VECTOR(frames, MovieClipFrame);

        void set_scalingGrid(const Napi::CallbackInfo& info, const Napi::Value& value)
        {
            if (value.IsUndefined())
            {
                parent->scalingGrid(nullptr);
            }

            Napi::Object grid = value.As<Napi::Object>();
            sc::ScalingGrid* nativeGrid = new sc::ScalingGrid();

            if (grid.Has("x"))
            {
                nativeGrid->x = ToNativeValue<float>(grid.Get("x"));
            }

            if (grid.Has("y"))
            {
                nativeGrid->y = ToNativeValue<float>(grid.Get("y"));
            }

            if (grid.Has("width"))
            {
                nativeGrid->width = ToNativeValue<float>(grid.Get("width"));
            }

            if (grid.Has("height"))
            {
                nativeGrid->height = ToNativeValue<float>(grid.Get("height"));
            }

            parent->scalingGrid(nativeGrid);
        }

        Napi::Value get_scalingGrid(const Napi::CallbackInfo& info)
        {
            if (parent->scalingGrid() == nullptr)
            {
                return info.Env().Undefined();
            }

            Napi::Object grid = Napi::Object::New(info.Env());
            sc::ScalingGrid* nativeGrid = parent->scalingGrid();

            grid.Set("x", ToJSValue(info, nativeGrid->x));
            grid.Set("y", ToJSValue(info, nativeGrid->y));
            grid.Set("width", ToJSValue(info, nativeGrid->width));
            grid.Set("height", nativeGrid->height);

            return grid;
        }
    };
}
