#include <napi.h>
#include "Utils.h"
#include <SupercellFlash.h>

#include "node_binding/constructor.h"
#include "node_binding/typed_call.h"

#include <iostream>

namespace scNapi
{
    class Export: public Napi::ObjectWrap<Export>
    {
    public:
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon

        Export(const Napi::CallbackInfo& info); // Node constructor
        
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js

        sc::Export *parent = nullptr; // Pointer to object that this class is attached to
    private:
        /* id */
        void set_id(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_id(const Napi::CallbackInfo& info);

        /* name */
        void set_name(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_name(const Napi::CallbackInfo& info);

    };
}