#include "SupercellCompression.h"

namespace scNapi
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

    Napi::Object compressorObject = Napi::Object::New(env);
    classObject.Set("Compressor", compressorObject);

    compressorObject.Set("compressFile", Napi::Function::New(env, &SupercellCompression::compressFile));
    compressorObject.Set("compress", Napi::Function::New(env, &SupercellCompression::compress));
    compressorObject.Set("commonCompress", Napi::Function::New(env, &SupercellCompression::commonCompress));
  }

}
