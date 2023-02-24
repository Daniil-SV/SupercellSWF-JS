// Copyright (c) 2019 The NodeBinding Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
#pragma once

#include <vector>

#include "type_convertor.h"

namespace node_binding
{

  template <typename T>
  class TypeConvertor<std::vector<T>> {
  public:
    static std::vector<T> ToNativeValue(const Napi::Value& value)
    {
      std::vector<T> ret;
      Napi::Array arr = value.As<Napi::Array>();
      ret.reserve(arr.Length());
      for (size_t i = 0; i < arr.Length(); ++i)
      {
        ret.push_back(TypeConvertor<T>::ToNativeValue(arr[i]));
      }
      return ret;
    }

    static bool IsConvertible(const Napi::Value& value)
    {
      if (!value.IsArray()) return false;
      Napi::Array arr = value.As<Napi::Array>();
      for (size_t i = 0; i < arr.Length(); ++i)
      {
        if (!TypeConvertor<T>::IsConvertible(arr[i])) return false;
      }
      return true;
    }

    static Napi::Value ToJSValue(const Napi::CallbackInfo& info,
      const std::vector<T>& value)
    {
      Napi::Array ret = Napi::Array::New(info.Env(), value.size());
      for (size_t i = 0; i < value.size(); ++i)
      {
        ret[i] = TypeConvertor<T>::ToJSValue(info, value[i]);
      }
      return ret;
    }
  };

}  // namespace node_binding