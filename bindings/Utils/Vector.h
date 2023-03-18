#pragma once
#include <napi.h>

#include "node_binding/type_convertor.h"
#include "LinkedObject.h"

using namespace node_binding;

namespace scNapi
{
    template <class T>
    struct Vector {
        Vector(std::vector<T>* data):
            data(data)
        {};

        std::vector<T>* data;

        Napi::Value get_item(const Napi::CallbackInfo& info)
        {
            Napi::Env env = info.Env();

            uint32_t index = ToNativeValue<uint32_t>(info[0]);
            try
            {   
                return Napi::External<T>::New(env, &(data->at(index)));
            }
            catch (const std::out_of_range&)
            {
                return info.Env().Undefined();
            }
        }

        Napi::Value insert_item(const Napi::CallbackInfo& info, T* item)
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
    };
}