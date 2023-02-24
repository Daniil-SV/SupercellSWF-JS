#pragma once

#include "type_convertor.h"
#include <napi.h>

#include "ScObject.hpp"

using namespace node_binding;

namespace scNapi
{
    template <class Vec_T>
    struct Vector {
        Vector::Vector(std::vector<Vec_T>* data, Napi::FunctionReference* constructor):
            data(data), constructor(constructor)
        {};

        Napi::Value get_item(const Napi::CallbackInfo& info)
        {
            Napi::Env env = info.Env();

            uint32_t index = ToNativeValue<uint32_t>(info[0]);
            try
            {   
                return Napi::External<Vec_T>::New(env, &(data->at(index)));
            }
            catch (const std::out_of_range&)
            {
                return info.Env().Undefined();
            }
        }

        Napi::Value insert_item(const Napi::CallbackInfo& info, Vec_T* item)
        {
            if (item)
            {
                data->insert(
                    data->begin() +
                    ToNativeValue<uint32_t>(info[1]),
                    *item
                );
                return ToJSValue(info, true);
            }

            return ToJSValue(info, false);
        };

        Napi::Value remove_item(const Napi::CallbackInfo& info)
        {
            data->erase(data->begin() + ToNativeValue<uint32_t>(info[0]));
            return Napi::Boolean::New(info.Env(), true);
        };

        Napi::Value get_length(const Napi::CallbackInfo& info)
        {
            return ToJSValue<size_t>(info, data->size());
        }

        void set_length(const Napi::CallbackInfo& info)
        {
            data->resize(ToNativeValue<size_t>(info[0]));
        }

        std::vector<Vec_T>* data;
        Napi::FunctionReference* constructor;
    };
}