// Copyright (c) 2019 The NodeBinding Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
#pragma once

#include <sstream>
#include <type_traits>

#include "napi.h"
#include "template_util.h"
#include "type_convertor.h"

namespace node_binding {

template <typename... Args>
struct ArgTypeChecker {
  static void Check(const Napi::CallbackInfo& info, size_t i, size_t n) {
    return;
  }
};

template <typename T, typename... Rest>
struct ArgTypeChecker<T, Rest...> {
  static void Check(const Napi::CallbackInfo& info, size_t i, size_t n) {
    if (i == n) return;

    if (TypeConvertor<std::decay_t<T>>::IsConvertible(info[i])) {
      return ArgTypeChecker<Rest...>::Check(info, i + 1, n);
    } else {
      std::stringstream ss;
      ss << "Type of arg" << i << " is mismatched";
      Napi::TypeError::New(info.Env(), ss.str()).ThrowAsJavaScriptException();
    }
  }
};

}  // namespace node_binding