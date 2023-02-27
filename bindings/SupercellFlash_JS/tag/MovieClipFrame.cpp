#include "MovieClipFrame.h"

namespace scNapi {
     /*
    ^ MovieClipFrame
    */
    /*
     * Addon initializator
     */
    void MovieClipFrame::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "MovieClipFrame",
                {
                    InstanceAccessor("elementsCount", &MovieClipFrame::get_ElementsCount, &MovieClipFrame::set_ElementsCount),
                    InstanceAccessor("label", &MovieClipFrame::get_Label, &MovieClipFrame::set_Label)
                });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("MovieClipFrame", func);
    }

    Napi::FunctionReference MovieClipFrame::constructor;
    MovieClipFrame::MovieClipFrame(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<MovieClipFrame>(info)
    {
        Utils::initializeClass<sc::MovieClipFrame>(this, info);
    };

    /*
    & ElementsCount
    */
    void MovieClipFrame::set_ElementsCount(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->elementsCount = ToNativeValue<uint16_t>(value);
    }
    Napi::Value MovieClipFrame::get_ElementsCount(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->elementsCount);
    }

    /*
    & Label
    */
    void MovieClipFrame::set_Label(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->label = ToNativeValue<std::string>(value);
    }
    Napi::Value MovieClipFrame::get_Label(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->label);
    }
}