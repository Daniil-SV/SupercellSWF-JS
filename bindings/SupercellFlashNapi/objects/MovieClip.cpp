#include "MovieClip.h"

namespace scNapi
{
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
    void DisplayObjectInstance::set_id(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->id = ToNativeValue<uint16_t>(value);
    }
    Napi::Value DisplayObjectInstance::get_id(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->id);
    }

    /*
    & Blend
    */
    void DisplayObjectInstance::set_Blend(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->blend = ToNativeValue<uint8_t>(value);
    }
    Napi::Value DisplayObjectInstance::get_Blend(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->blend);
    }


    /*
    & Name
    */
    void DisplayObjectInstance::set_Name(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->name = ToNativeValue<std::string>(value);
    }
    Napi::Value DisplayObjectInstance::get_Name(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->name);
    }

    Napi::FunctionReference DisplayObjectInstance::constructor;
    DisplayObjectInstance::DisplayObjectInstance(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<DisplayObjectInstance>(info)
    {
        Utils::initializeClass<sc::DisplayObjectInstance>(this, info);
    };

    /*
    ^ MovieClip
    */
    /*
     * Addon initializator
     */
    void MovieClip::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "MovieClip",
                {
                    InstanceAccessor("id", &MovieClip::get_id, &MovieClip::set_id),
                    InstanceAccessor("frameRate", &MovieClip::get_FrameRate, &MovieClip::set_FrameRate),
                    InstanceAccessor("scalingGrid", &MovieClip::get_ScalingGrid, &MovieClip::set_ScalingGrid),
                    InstanceAccessor("matrixBankIndex", &MovieClip::get_MatrixBankIndex, &MovieClip::set_MatrixBankIndex),
                    InstanceAccessor("unknownFlag", &MovieClip::get_UnknownFlag, &MovieClip::set_UnknownFlag),

                    InstanceMethod("__get_element__", &MovieClip::get_element),
                    InstanceMethod("__insert_element__", &MovieClip::insert_element),
                    InstanceMethod("__remove_element__", &MovieClip::remove_element),
                    InstanceMethod("__get_elements_length__", &MovieClip::get_elements_length),
                    InstanceMethod("__set_elements_length__", &MovieClip::set_elements_length),

                    InstanceMethod("__get_instance__", &MovieClip::get_instance),
                    InstanceMethod("__insert_instance__", &MovieClip::insert_instance),
                    InstanceMethod("__remove_instance__", &MovieClip::remove_instance),
                    InstanceMethod("__get_instances_length__", &MovieClip::get_instances_length),
                    InstanceMethod("__set_instances_length__", &MovieClip::set_instances_length),

                    InstanceMethod("__get_frame__", &MovieClip::get_frame),
                    InstanceMethod("__insert_frame__", &MovieClip::insert_frame),
                    InstanceMethod("__remove_frame__", &MovieClip::remove_frame),
                    InstanceMethod("__get_frames_length__", &MovieClip::get_frames_length),
                    InstanceMethod("__set_frames_length__", &MovieClip::set_frames_length)
                });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("MovieClip", func);
    }

    Napi::FunctionReference MovieClip::constructor;
    MovieClip::MovieClip(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<MovieClip>(info)
    {
        Utils::initializeClass<sc::MovieClip>(this, info);

        frameElements = new Vector<sc::MovieClipFrameElement>(&parent->frameElements);
        instances = new Vector<sc::DisplayObjectInstance>(&parent->instances);
        frames = new Vector<sc::MovieClipFrame>(&parent->frames);
    };

    /* 
    & Id getter
    */

    void MovieClip::set_id(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->id(ToNativeValue<uint16_t>(value));
    }
    Napi::Value MovieClip::get_id(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->id());
    }

    /*
    & FrameRate
    */
    void MovieClip::set_FrameRate(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->frameRate(ToNativeValue<uint8_t>(value));
    }
    Napi::Value MovieClip::get_FrameRate(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->frameRate());
    }

    /*
    & ScalingGrid
    */
    void MovieClip::set_ScalingGrid(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        if (value.IsUndefined())
        {
            parent->scalingGrid(nullptr);
        }

        Napi::Object grid = value.As<Napi::Object>();
        sc::ScalingGrid* nativeGrid = new sc::ScalingGrid();

        if (grid.Has("x"))
        {
            nativeGrid->x = ToNativeValue<float>(grid.Get("x"));
        }

        if (grid.Has("y"))
        {
            nativeGrid->y = ToNativeValue<float>(grid.Get("y"));
        }

        if (grid.Has("width"))
        {
            nativeGrid->width = ToNativeValue<float>(grid.Get("width"));
        }

        if (grid.Has("height"))
        {
            nativeGrid->height = ToNativeValue<float>(grid.Get("height"));
        }

        parent->scalingGrid(nativeGrid);
    }

    Napi::Value MovieClip::get_ScalingGrid(const Napi::CallbackInfo& info)
    {
        if (parent->scalingGrid() == nullptr)
        {
            return info.Env().Undefined();
        }

        Napi::Object grid = Napi::Object::New(info.Env());
        sc::ScalingGrid* nativeGrid = parent->scalingGrid();

        grid.Set("x", ToJSValue(info, nativeGrid->x));
        grid.Set("y", ToJSValue(info, nativeGrid->y));
        grid.Set("width", ToJSValue(info, nativeGrid->width));
        grid.Set("height", nativeGrid->height);

        return grid;
    }

    /*
    & MatrixBankIndex
    */
    void MovieClip::set_MatrixBankIndex(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->matrixBankIndex(ToNativeValue<uint8_t>(value));
    }
    Napi::Value MovieClip::get_MatrixBankIndex(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->matrixBankIndex());
    }

    /*
    & MatrixBankIndex
    */
    void MovieClip::set_UnknownFlag(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->unknownFlag(ToNativeValue<uint8_t>(value));
    }
    Napi::Value MovieClip::get_UnknownFlag(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->unknownFlag());
    }

    /*
    ! FrameElements Array
    */
    Napi::Value MovieClip::get_element(const Napi::CallbackInfo& info)
    {
        return frameElements->get_item(info);
    }
    Napi::Value MovieClip::insert_element(const Napi::CallbackInfo& info)
    {
        return frameElements->insert_item(info, MovieClipFrameElement::Unwrap(info[0].ToObject())->get_parent());
    };
    Napi::Value MovieClip::remove_element(const Napi::CallbackInfo& info)
    {
        return frameElements->remove_item(info);
    };
    Napi::Value MovieClip::get_elements_length(const Napi::CallbackInfo& info)
    {
        return frameElements->get_length(info);
    }
    void MovieClip::set_elements_length(const Napi::CallbackInfo& info)
    {
        return frameElements->set_length(info);
    }


    /*
    ! Instances Array
    */
    Napi::Value MovieClip::get_instance(const Napi::CallbackInfo& info)
    {
        return instances->get_item(info);
    }
    Napi::Value MovieClip::insert_instance(const Napi::CallbackInfo& info)
    {
        return instances->insert_item(info, DisplayObjectInstance::Unwrap(info[0].ToObject())->get_parent());
    };
    Napi::Value MovieClip::remove_instance(const Napi::CallbackInfo& info)
    {
        return instances->remove_item(info);
    };
    Napi::Value MovieClip::get_instances_length(const Napi::CallbackInfo& info)
    {
        return instances->get_length(info);
    }
    void MovieClip::set_instances_length(const Napi::CallbackInfo& info)
    {
        return instances->set_length(info);
    }

    /*
    ! Frames Array
    */
    Napi::Value MovieClip::get_frame(const Napi::CallbackInfo& info)
    {
        return frames->get_item(info);
    }
    Napi::Value MovieClip::insert_frame(const Napi::CallbackInfo& info)
    {
        return frames->insert_item(info, MovieClipFrame::Unwrap(info[0].ToObject())->get_parent());
    };
    Napi::Value MovieClip::remove_frame(const Napi::CallbackInfo& info)
    {
        return frames->remove_item(info);
    };
    Napi::Value MovieClip::get_frames_length(const Napi::CallbackInfo& info)
    {
        return frames->get_length(info);
    }
    void MovieClip::set_frames_length(const Napi::CallbackInfo& info)
    {
        return frames->set_length(info);
    }
}