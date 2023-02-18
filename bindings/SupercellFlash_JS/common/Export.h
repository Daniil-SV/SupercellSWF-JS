#include <napi.h>
#include <SupercellFlash.h>

#include "node_binding/constructor.h"

#include "Utils.hpp"
#include "../../ScObject.hpp"

namespace scNapi
{
    class Export: public Napi::ObjectWrap<Export>, public ScObject<sc::Export>
    {
    public:
        static Napi::FunctionReference constructor; // C++ constrcutor to init class in Node.js
        static void Initialize(Napi::Env& env, Napi::Object& target); // Export initialize in Addon
        Export(const Napi::CallbackInfo& info); // Node constructor

        sc::Export* get_parent() override
        {
            return parent;
        };

    private:
        sc::Export* parent = nullptr; // Pointer to object that this class is attached to

        /* id */
        void set_id(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_id(const Napi::CallbackInfo& info);

        /* name */
        void set_name(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_name(const Napi::CallbackInfo& info);

    };
}