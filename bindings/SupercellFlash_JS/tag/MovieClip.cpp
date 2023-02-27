#include "MovieClip.h"

namespace scNapi
{
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

    /*
    ^ MovieClipFrameElement
    */
    /*
     * Addon initializator
     */
    void MovieClipFrameElement::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "MovieClipFrameElement",
                {
                    InstanceAccessor("instanceIndex", &MovieClipFrameElement::get_InstanceIndex, &MovieClipFrameElement::set_InstanceIndex),
                    InstanceAccessor("matrixIndex", &MovieClipFrameElement::get_MatrixIndex, &MovieClipFrameElement::set_MatrixIndex),
                    InstanceAccessor("colorTransformIndex", &MovieClipFrameElement::get_ColorTransformIndex, &MovieClipFrameElement::set_ColorTransformIndex)
                });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("MovieClipFrameElement", func);
    }

    Napi::FunctionReference MovieClipFrameElement::constructor;
    MovieClipFrameElement::MovieClipFrameElement(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<MovieClipFrameElement>(info)
    {
        Utils::initializeClass<sc::MovieClipFrameElement>(this, info);
    };

    /*
    & InstanceIndex
    */
    void MovieClipFrameElement::set_InstanceIndex(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->instanceIndex = ToNativeValue<uint16_t>(value);
    }
    Napi::Value MovieClipFrameElement::get_InstanceIndex(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->instanceIndex);
    }

    /*
    & MatrixIndex
    */
    void MovieClipFrameElement::set_MatrixIndex(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->matrixIndex = ToNativeValue<uint16_t>(value);
    }
    Napi::Value MovieClipFrameElement::get_MatrixIndex(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->matrixIndex);
    }

    /*
    & ColorTransformIndex
    */
    void MovieClipFrameElement::set_ColorTransformIndex(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->colorTransformIndex = ToNativeValue<uint16_t>(value);
    }
    Napi::Value MovieClipFrameElement::get_ColorTransformIndex(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->colorTransformIndex);
    }

    /*
    ^ DisplayObjectInstance
    */
    /*
     * Addon initializator
     */
    void DisplayObjectInstance::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "DisplayObjectInstance",
                {
                    InstanceAccessor("id", &DisplayObjectInstance::get_id, &DisplayObjectInstance::set_id),
                    InstanceAccessor("blend", &DisplayObjectInstance::get_Blend, &DisplayObjectInstance::set_Blend),
                    InstanceAccessor("name", &DisplayObjectInstance::get_Name, &DisplayObjectInstance::set_Name)
                });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("DisplayObjectInstance", func);
    }

    /*
    & id
    */
    void DisplayObjectInstance::set_id(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->id = ToNativeValue<uint16_t>(value);
    }
    Napi::Value DisplayObjectInstance::get_id(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->id);
    }

    /*
    & Blend
    */
    void DisplayObjectInstance::set_Blend(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->blend = ToNativeValue<uint8_t>(value);
    }
    Napi::Value DisplayObjectInstance::get_Blend(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->blend);
    }


    /*
    & Name
    */
    void DisplayObjectInstance::set_Name(const Napi::CallbackInfo& info, const Napi::Value& value) {
        parent->name = ToNativeValue<std::string>(value);
    }
    Napi::Value DisplayObjectInstance::get_Name(const Napi::CallbackInfo& info) {
        return ToJSValue(info, parent->name);
    }

    Napi::FunctionReference DisplayObjectInstance::constructor;
    DisplayObjectInstance::DisplayObjectInstance(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<DisplayObjectInstance>(info)
    {
        Utils::initializeClass<sc::DisplayObjectInstance>(this, info);
    };
}