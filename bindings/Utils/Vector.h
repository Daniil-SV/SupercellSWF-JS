#pragma once
#include <napi.h>
#include <functional>

#include "node_binding/type_convertor.h"
#include "LinkedObject.h"

using namespace node_binding;

namespace scNapi
{
    template <class NativeType, class T>
    struct Vector {
        Vector(std::vector<NativeType*>* data, T* (*unwrapper)(Napi::Object)):
            data(data), unwrap(unwrapper)
        {};

        T* (*unwrap)(Napi::Object);
        std::vector<NativeType*>* data;

        Napi::Value get_item(const Napi::CallbackInfo& info)
        {
            Napi::Env env = info.Env();

            uint32_t index = ToNativeValue<uint32_t>(info[0]);
            try
            {
                return Napi::External<NativeType>::New(env, data->at(index));
            }
            catch (const std::out_of_range&)
            {
                return info.Env().Undefined();
            }
        }

        Napi::Value insert_item(const Napi::CallbackInfo& info)
        {
            if (info[0].IsObject())
            {
                T* item = unwrap(info[0].ToObject());
                data->insert(
                    data->begin() +
                    ToNativeValue<uint32_t>(info[1]),
                    item
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

            for (size_t i = 0; data->size() > i; i++)
            {
                if (data->at(i) == NULL)
                {
                    data->at(i) = new NativeType();
                }
            }
        }
    };
}