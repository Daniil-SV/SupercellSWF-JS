#pragma once

#include <SupercellFlash.h>
#include <Napi.h>

#include "Matrix2x3.h"
#include "ColorTransform.h"
#include "Utils/Utils.hpp"

namespace scNapi
{
    class MatrixBank: public Napi::ObjectWrap<MatrixBank>, public ScObject<sc::MatrixBank>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        MatrixBank(const Napi::CallbackInfo& info); // Node constructor
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        sc::MatrixBank* get_parent() override
        {
            return parent;
        };

        void set_parent(sc::MatrixBank* item) override
        {
            parent = item;
        };

        void new_parent() override
        {
            parent = new sc::MatrixBank();
        }

        void fromObject(Napi::Env& env, Napi::Object object) override
        {
            if (object.Has("matrices"))
            {
                Napi::Object matrixVector = object.Get("matrices").ToObject();
                for (Napi::Value value : Utils::IteratorData(env, matrixVector))
                {
                    parent->matrices.push_back(*(
                        scNapi::Matrix2x3::Unwrap(
                            value.As<Napi::Object>()
                        )->get_parent())
                    );
                }
            }

            if (object.Has("colorTransforms"))
            {
                Napi::Object colorVector = object.Get("colorTransforms").ToObject();
                for (Napi::Value value : Utils::IteratorData(env, colorVector))
                {
                    parent->colorTransforms.push_back(*(
                        scNapi::ColorTransform::Unwrap(
                            value.As<Napi::Object>()
                        )->get_parent())
                    );
                }
            }

        }

    private:
        sc::MatrixBank* parent = nullptr; // Pointer to object that this class is attached to
        Vector<sc::Matrix2x3>* matrices = nullptr;
        Vector<sc::ColorTransform>* colorTransforms = nullptr;

        /*
        ! Matrcies
        */
        Napi::Value get_matrix(const Napi::CallbackInfo& info);
        Napi::Value insert_matrix(const Napi::CallbackInfo& info);
        Napi::Value remove_matrix(const Napi::CallbackInfo& info);
        Napi::Value get_matrices_length(const Napi::CallbackInfo& info);
        void set_matrices_length(const Napi::CallbackInfo& info);

        /*
        ! Colors
        */
        Napi::Value get_color(const Napi::CallbackInfo& info);
        Napi::Value insert_color(const Napi::CallbackInfo& info);
        Napi::Value remove_color(const Napi::CallbackInfo& info);
        Napi::Value get_colors_length(const Napi::CallbackInfo& info);
        void set_colors_length(const Napi::CallbackInfo& info);
    };
}