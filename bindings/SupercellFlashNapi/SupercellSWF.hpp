#pragma once

#include <SupercellFlash.h>
#include <napi.h>

#include "Utils/Utils.h"
#include "Utils/LinkedObject.h"
#include "Utils/Macros.h"

#include "objects/ExportName.hpp"
#include "objects/Shape.hpp"
#include "objects/SWFTexture.hpp"
#include "objects/TextField.hpp"
#include "objects/MovieClipModifier.hpp"
#include "transformation/MatrixBank.hpp"
#include "objects/MovieClip.hpp"

using namespace node_binding;

namespace scNapi
{
    class SupercellSWF: public Napi::ObjectWrap<SupercellSWF>, public LinkedObject<sc::SupercellSWF>
    {
    public:
        inline static Napi::FunctionReference constructor;

        inline static void Initialize(Napi::Env& env, Napi::Object& target)
        {
            Napi::Function func =
                DefineClass(env, "SupercellSWF",
                    {
                        InstanceMethod("load", &SupercellSWF::load),
                        InstanceMethod("loadTexture", &SupercellSWF::loadTexture),

                        InstanceMethod("save", &SupercellSWF::save),
                        InstanceMethod("saveTexture", &SupercellSWF::saveTexture),

                        PROPERTY_ACCESSOR(scNapi::SupercellSWF, useMultiResTexture),
                        PROPERTY_ACCESSOR(scNapi::SupercellSWF, useLowResTexture),
                        PROPERTY_ACCESSOR(scNapi::SupercellSWF, useExternalTexture),

                        PROPERTY_ACCESSOR(scNapi::SupercellSWF, multiResFileSuffix),
                        PROPERTY_ACCESSOR(scNapi::SupercellSWF, lowResFileSuffix),

                        VECTOR_ACCESSOR(SupercellSWF, shapes),
                        VECTOR_ACCESSOR(SupercellSWF, exports),
                        VECTOR_ACCESSOR(SupercellSWF, textures),
                        VECTOR_ACCESSOR(SupercellSWF, textFields),
                        VECTOR_ACCESSOR(SupercellSWF, movieClipModifiers),
                        VECTOR_ACCESSOR(SupercellSWF, matrixBanks),
                        VECTOR_ACCESSOR(SupercellSWF, movieClips)
                    });

            constructor = Napi::Persistent(func);
            constructor.SuppressDestruct();

            target.Set("SupercellSWF", func);
        }

        SupercellSWF(const Napi::CallbackInfo& info): Napi::ObjectWrap<SupercellSWF>(info)
        {
            INITIALIZER(SupercellSWF);
        };

        void fromObject(const Napi::CallbackInfo& info, Napi::Object object) override
        {
            PROPERTY_INIT(useMultiResTexture);
            PROPERTY_INIT(useLowResTexture);
            PROPERTY_INIT(useExternalTexture);

            PROPERTY_INIT(multiResFileSuffix);
            PROPERTY_INIT(lowResFileSuffix);

            VECTOR_PROPERTY_INIT(shapes, Shape);
            VECTOR_PROPERTY_INIT(exports, ExportName);
            VECTOR_PROPERTY_INIT(textures, SWFTexture);
            VECTOR_PROPERTY_INIT(textFields, TextField);
            VECTOR_PROPERTY_INIT(movieClipModifiers, MovieClipModifier);
            VECTOR_PROPERTY_INIT(matrixBanks, MatrixBank);
            VECTOR_PROPERTY_INIT(movieClips, MovieClip);
        }

    private:
        Napi::Value load(const Napi::CallbackInfo& info)
        {
            Napi::Env env = info.Env();
            Napi::Value unk = env.Undefined();
            try
            {
                std::string path = Utils::getPath(info.Env(), info[0], true);
                if (path.size() == 0)
                {
                    return unk;
                }
                parent->load(path);
            }
            catch (const std::exception& e)
            {
                Napi::Error::New(info.Env(), e.what()).ThrowAsJavaScriptException();
                return unk;
            }

            return info.This();
        }
        Napi::Value loadTexture(const Napi::CallbackInfo& info)
        {
            Napi::Env env = info.Env();
            Napi::Value unk = env.Undefined();
            try
            {
                std::string path = Utils::getPath(info.Env(), info[0], true);
                if (path.size() == 0)
                {
                    return unk;
                }

                uint8_t textureCount = 255;
                parent->textures = std::vector<sc::SWFTexture*>(textureCount);

                parent->loadInternal(path, true);

                for (uint8_t i = 0; textureCount > i; i++)
                {
                    if (parent->textures[i] == NULL)
                    {
                        parent->textures.erase(parent->textures.begin() + i);
                        textureCount--;
                        i--;
                    }
                }

            }
            catch (const std::exception& e)
            {
                Napi::Error::New(info.Env(), e.what()).ThrowAsJavaScriptException();
                return unk;
            }

            return info.This();
        }

        Napi::Value save(const Napi::CallbackInfo& info)
        {
            Napi::Env env = info.Env();
            Napi::Value unk = env.Undefined();

            std::string path = Utils::getPath(info.Env(), info[0], false);
            if (path.size() == 0)
            {
                return unk;
            }

            try
            {
                parent->save(path, (sc::CompressionSignature)ToNativeValue<uint8_t>(info[1]));

            }
            catch (const std::exception& e)
            {
                Napi::Error::New(info.Env(), e.what()).ThrowAsJavaScriptException();
                return unk;
            }

            return info.This();
        }

        Napi::Value saveTexture(const Napi::CallbackInfo& info)
        {
            Napi::Env env = info.Env();
            Napi::Value unk = env.Undefined();

            std::string path = Utils::getPath(info.Env(), info[0], false);
            if (path.size() == 0)
            {
                return unk;
            }

            try
            {
                parent->stream.clear();
                for (sc::SWFTexture* texture : parent->textures)
                {
                    texture->save(parent, true, false);
                }
                parent->stream.writeTag(0);
                parent->stream.save(ToNativeValue<std::string>(info[0]), (sc::CompressionSignature)ToNativeValue<uint8_t>(info[1]));

            }
            catch (const std::exception& e)
            {
                Napi::Error::New(info.Env(), e.what()).ThrowAsJavaScriptException();
                return unk;
            }

            return info.This();
        }

        PROPERTY(useMultiResTexture, bool);
        PROPERTY(useLowResTexture, bool);
        PROPERTY(useExternalTexture, bool);

        PROPERTY(multiResFileSuffix, std::string);
        PROPERTY(lowResFileSuffix, std::string);

        VECTOR(shapes, Shape);
        VECTOR(exports, ExportName);
        VECTOR(textures, SWFTexture);
        VECTOR(textFields, TextField);
        VECTOR(movieClipModifiers, MovieClipModifier);
        VECTOR(matrixBanks, MatrixBank);
        VECTOR(movieClips, MovieClip);
    };
}
