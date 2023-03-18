#pragma once
#include <napi.h>

namespace scNapi
{

    template <class T>
    struct LinkedObject {
        T* parent = nullptr; // Pointer to object that this class is attached to

        T* get_parent() { return parent; };
        void set_parent(T* item) { parent = item; };
        void new_parent() { parent = new T(); };
        virtual void fromObject(Napi::Env env, Napi::Object object) = 0;
    };

}