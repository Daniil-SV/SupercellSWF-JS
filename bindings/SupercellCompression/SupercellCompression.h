#include <string>
#include <napi.h>
#include <SupercellCompression.h>

namespace scNode
{
  class SupercellCompression : public Napi::ObjectWrap<SupercellCompression>
  {
  public:
    /* Class initialize */
    SupercellCompression(const Napi::CallbackInfo &info): Napi::ObjectWrap<SupercellCompression>(info) {};
    static void Initialize(Napi::Env &env, Napi::Object &target);

    /* Decompressor functions */
    static Napi::Value decompressFile(const Napi::CallbackInfo &info);
    static Napi::Value decompress(const Napi::CallbackInfo &info);
    static Napi::Value commonDecompress(const Napi::CallbackInfo &info);
    static Napi::Value getProps(const Napi::CallbackInfo &info);

    /* Compressor functions */
    static Napi::Value compressFile(const Napi::CallbackInfo &info);
    static Napi::Value compress(const Napi::CallbackInfo &info);
  };
}
