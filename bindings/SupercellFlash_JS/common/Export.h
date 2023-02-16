#include <napi.h>
#include "Utils.h"
#include <SupercellFlash.h>

namespace scNapi
{
    class Export: public Napi::ObjectWrap<Export>, public sc::Export
    {
    public:
        Export(const Napi::CallbackInfo& info);
        static void Init(Napi::Env& env, Napi::Object& target);

    private:
        /* id */
        void set_id(const Napi::CallbackInfo& info, const Napi::Value& value);
        Napi::Value get_id(const Napi::CallbackInfo& info);
    };
}