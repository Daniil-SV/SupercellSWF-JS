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
    class MovieClip : public Napi::ObjectWrap<MovieClip>, public LinkedObject<sc::MovieClip>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "MovieClip",
                    {
                        PROPERTY_ACCESSOR(scNapi::MovieClip, id),
                        PROPERTY_ACCESSOR(scNapi::MovieClip, frameRate),
                        PROPERTY_ACCESSOR(scNapi::MovieClip, matrixBankIndex),
                        PROPERTY_ACCESSOR(scNapi::MovieClip, unknownFlag),
                        PROPERTY_ACCESSOR(scNapi::MovieClip, scalingGrid),
                        VECTOR_ACCESSOR(MovieClip, frameElements),
                        VECTOR_ACCESSOR(MovieClip, instances),
                        VECTOR_ACCESSOR(MovieClip, frames)

                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("MovieClip", func);
        }

        MovieClip(const Napi::CallbackInfo& info) : Napi::ObjectWrap<MovieClip>(info)
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
        PROPERTY_DEF(id);
        PROPERTY_DEF(unknownFlag);
        PROPERTY_DEF(frameRate);
        PROPERTY_DEF(matrixBankIndex);
        PROPERTY_DEF(scalingGrid);

        VECTOR(frameElements, MovieClipFrameElement);
        VECTOR(instances, DisplayObjectInstance);
        VECTOR(frames, MovieClipFrame);
    };
}
