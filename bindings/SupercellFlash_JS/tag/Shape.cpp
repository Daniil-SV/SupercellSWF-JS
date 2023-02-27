#include "Shape.h"

using namespace node_binding;

namespace scNapi
{
    /*
    ^ Shape
    */
    /*
     * Addon initializator
     */
    void Shape::Initialize(Napi::Env& env, Napi::Object& exports)
    {
        Napi::Function func =
            DefineClass(env, "Shape",
                {
                    InstanceAccessor("id", &Shape::get_id, &Shape::set_id),

                    InstanceMethod("__get_command__", &Shape::get_command),
                    InstanceMethod("__insert_command__", &Shape::insert_command),
                    InstanceMethod("__remove_command__", &Shape::remove_command),
                    InstanceMethod("__get_commands_length__", &Shape::get_commands_length),
                    InstanceMethod("__set_commands_length__", &Shape::set_commands_length)
                });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();

        exports.Set("Shape", func);
    }

    Napi::FunctionReference Shape::constructor;
    Shape::Shape(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<Shape>(info)
    {
        Utils::initializeClass(this, info);

        commands = new Vector<sc::ShapeDrawBitmapCommand>(&parent->commands, &Shape::constructor);
    };

    /* 
    & Id getter
    */

    void Shape::set_id(const Napi::CallbackInfo& info, const Napi::Value& value)
    {
        parent->id(ToNativeValue<uint16_t>(value));
    }
    Napi::Value Shape::get_id(const Napi::CallbackInfo& info)
    {
        return ToJSValue(info, parent->id());
    }

    /*
    ! Bitmap getters
    */
    Napi::Value Shape::get_command(const Napi::CallbackInfo& info)
    {
        return commands->get_item(info);
    }
    Napi::Value Shape::insert_command(const Napi::CallbackInfo& info)
    {
        return commands->insert_item(info, ShapeDrawBitmapCommand::Unwrap(info[0].ToObject())->get_parent());
    };
    Napi::Value Shape::remove_command(const Napi::CallbackInfo& info)
    {
        return commands->remove_item(info);
    };
    Napi::Value Shape::get_commands_length(const Napi::CallbackInfo& info)
    {
        return commands->get_length(info);
    }
    void Shape::set_commands_length(const Napi::CallbackInfo& info)
    {
        return commands->set_length(info);
    }
}