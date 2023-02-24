#pragma once
#include <napi.h>

namespace scNapi {
    template <typename T>
    struct ScObject {
        virtual T* get_parent() = 0;
        virtual void set_parent(T* item ) = 0;
        virtual void new_parent() = 0;
        virtual void fromObject(Napi::Env& env, Napi::Object object) = 0;
    };
}