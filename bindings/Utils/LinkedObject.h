#pragma once
#include <napi.h>

namespace scNapi
{

    template <class NativeType>
    struct LinkedObject {
        NativeType* parent = nullptr; // Pointer to object that this class is attached to

        NativeType* get_parent() { return parent; };
        void set_parent(NativeType* item) { parent = item; };
        void new_parent() { parent = new NativeType(); };
        virtual void fromObject(const Napi::CallbackInfo& info, Napi::Object object) = 0;
    };

}