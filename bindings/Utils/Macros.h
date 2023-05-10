#pragma once

#define STRINGIFY(x) #x
#define TOSTRING(x) STRINGIFY(x)
#define MY_STRING TOSTRING(STRING_IN)

namespace scNapi
{
//! Initializator for c++ object constructor
#define INITIALIZER(NAME) {                                           \
if (info[0].IsExternal())                                               \
{                                                                       \
    set_parent(info[0].As<Napi::External<sc::NAME>>().Data());         \
}                                                                       \
else if (info[0].IsObject())                                            \
{                                                                       \
    Napi::Object obj = info[0].ToObject();                              \
    if (obj.InstanceOf(constructor.Value()))                            \
    {                                                                   \
        NAME* initObj = NAME::Unwrap(obj);                            \
        set_parent(Utils::deepCopy(initObj->get_parent()));             \
    }                                                                   \
    else                                                                \
    {                                                                   \
        new_parent();                                                   \
        fromObject(info, obj);                                    \
    }                                                                   \
}                                                                       \
else                                                                    \
{                                                                       \
    new_parent();                                                       \
}                                                                       \
}

//! Macros to set property value from object

#define PROPERTY_INIT(Name) { \
if (object.Has(#Name)) \
{ \
    set_##Name(info, object.Get(#Name)); \
} \
}

//! Class members definition

#define PROPERTY(name) \
    void set_##name(const Napi::CallbackInfo& info, const Napi::Value& value) \
    {

#define PROPERTY_GET(name) \
    }; \
    Napi::Value get_##name(const Napi::CallbackInfo& info) \
    { \

#define PROPERTY_END \
    }

#define VECTOR(Name, Type) \
Napi::Value get_##Name(const Napi::CallbackInfo& info) { \
    Napi::Env env = info.Env();\
    uint32_t index = ToNativeValue<uint32_t>(info[0]); \
    try \
    { \
        return Napi::External<sc::Type>::New(env, parent->Name.at(index)); \
    } \
    catch (const std::out_of_range&) \
    { \
        return env.Undefined(); \
    } \
}; \
Napi::Value insert_##Name(const Napi::CallbackInfo& info) \
{ \
    if (info[0].IsObject()) \
    { \
        scNapi::Type* item = scNapi::Type::Unwrap(info[0].ToObject());\
        parent->Name.insert( \
            parent->Name.begin() + \
            ToNativeValue<uint32_t>(info[1]), \
            item->get_parent() \
        ); \
        return ToJSValue(info, true);\
    } \
    return ToJSValue(info, false);\
}; \
Napi::Value remove_##Name(const Napi::CallbackInfo& info) \
{ \
    parent->Name.erase(parent->Name.begin() + ToNativeValue<uint32_t>(info[0])); \
    return Napi::Boolean::New(info.Env(), true); \
}; \
Napi::Value get_length_##Name(const Napi::CallbackInfo& info) \
{ \
    return ToJSValue<size_t>(info, parent->Name.size()); \
}; \
void set_length_##Name(const Napi::CallbackInfo& info) \
{ \
    parent->Name.resize(ToNativeValue<size_t>(info[0])); \
    for (size_t i = 0; parent->Name.size() > i; i++) \
    { \
        if (parent->Name.at(i) == NULL) \
        { \
            parent->Name.at(i) = new sc::Type(); \
        } \
    } \
}

#define VECTOR_PROPERTY_INIT(Name, Initializator) { \
if (object.Has(#Name)) \
{ \
    Napi::Object Array = object.Get(#Name).ToObject(); \
    for (Napi::Value value : Utils::IteratorData(info.Env(), Array)) \
    { \
        parent->Name.push_back(scNapi::Initializator::Unwrap( \
            value.As<Napi::Object>() \
        )->get_parent()); \
    } \
} \
}

#define VECTOR_COMMAND_NAME(command, name) "__" #command "_" #name "__"

//! Accessors for NAPI Object initialization

#define VECTOR_ACCESSOR(ClassName, Name) \
InstanceMethod(VECTOR_COMMAND_NAME(get, Name), &ClassName::get_##Name), \
InstanceMethod(VECTOR_COMMAND_NAME(insert, Name), &ClassName::insert_##Name), \
InstanceMethod(VECTOR_COMMAND_NAME(remove, Name), &ClassName::remove_##Name), \
InstanceMethod(VECTOR_COMMAND_NAME(get_length, Name), &ClassName::get_length_##Name), \
InstanceMethod(VECTOR_COMMAND_NAME(set_length, Name), &ClassName::set_length_##Name) \

#define PROPERTY_ACCESSOR(codename, name) \
InstanceAccessor(#name, &##codename::get_##name, &##codename::set_##name)
}
