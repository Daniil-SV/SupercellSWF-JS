#include "SupercellCompression.h"
#include <iostream>

// class SupercellSWF: public sc::SupercellSWF, public Napi::ObjectWrap<SupercellSWF> {
// public:
//   SupercellSWF(const Napi::CallbackInfo &info);
//   static void Initialize(Napi::Env &env, Napi::Object &target);
//   Napi::Value node_load(const Napi::CallbackInfo &info);
// };
//
// /* Class constructor initializer */
// void SupercellSWF::Initialize(Napi::Env& env, Napi::Object& target) {
//   Napi::Function constructor = Napi::ObjectWrap<SupercellSWF>::DefineClass(env, "SupercellSWF", {
//
//     Napi::ObjectWrap<SupercellSWF>::InstanceMethod("load", &SupercellSWF::node_load),
//
//   });
//   target.Set("SupercellSWF", constructor);
// }
// /* Cpp class creation declaration */
// SupercellSWF::SupercellSWF(const Napi::CallbackInfo &info): Napi::ObjectWrap<SupercellSWF>(info) {}
//
// /* Test class function declaration */
// Napi::Value SupercellSWF::node_load(const Napi::CallbackInfo &info){
//   Napi::Env env = info.Env();
//
//   if (info.Length() < 2){
//     Napi::TypeError::New(env, "Wrong number of arguments")
//         .ThrowAsJavaScriptException();
//     return env.Undefined();
//   }
//
//   if (!info[0].IsString()) {
//     Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
//     return env.Undefined();
//   }
//
//   // load(info[0].As<std::string>());
//
//   return env.Undefined();
// }

namespace scNode
{
  void SupercellCompression::Initialize(Napi::Env &env, Napi::Object &target)
  {
    Napi::Object classObject = Napi::Object::New(env);
    target.Set("SupercellCompression", classObject);

    Napi::Object decompressorObject = Napi::Object::New(env);
    classObject.Set("Decompressor", decompressorObject);

    decompressorObject.Set("decompressFile", Napi::Function::New(env, &SupercellCompression::decompressFile));
    decompressorObject.Set("decompress", Napi::Function::New(env, &SupercellCompression::decompress));
    decompressorObject.Set("commonDecompress", Napi::Function::New(env, &SupercellCompression::commonDecompress));
    decompressorObject.Set("getProps", Napi::Function::New(env, &SupercellCompression::getProps));

    Napi::Object compressorObject = Napi::Object::New(env);
    classObject.Set("Compressor", compressorObject);

    compressorObject.Set("compressFile", Napi::Function::New(env, &SupercellCompression::compressFile));
    compressorObject.Set("compress", Napi::Function::New(env, &SupercellCompression::compress));
    compressorObject.Set("commonCompress", Napi::Function::New(env, &SupercellCompression::commonCompress));
  }

}
