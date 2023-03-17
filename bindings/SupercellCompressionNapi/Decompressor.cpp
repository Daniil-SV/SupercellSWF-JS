#include "SupercellCompression.h"

#include <SupercellBytestream.h>

namespace scNapi
{
    Napi::Value SupercellCompression::decompressFile(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        std::string outputPath;
        sc::Decompressor::decompress(ToNativeValue<std::string>(info[0]), outputPath);

        return ToJSValue(info, outputPath);

    }

    Napi::Value SupercellCompression::decompress(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        Napi::Buffer<uint8_t> inputBuffer = info[0].As<Napi::Buffer<uint8_t>>();
        std::vector<uint8_t> inputStreamBuffer(inputBuffer.Length());
        memcpy(inputStreamBuffer.data(), inputBuffer.Data(), inputStreamBuffer.size());
        sc::BufferStream inputStream(&inputStreamBuffer);

        std::vector<uint8_t> outputBuffer;
        sc::BufferStream outputStream(&outputBuffer);

        sc::Decompressor::decompress(inputStream, outputStream);

        Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, outputBuffer.data(), outputBuffer.size());
        inputStream.close();
        outputStream.close();

        return buffer;
    }

    Napi::Value SupercellCompression::commonDecompress(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        Napi::Buffer<uint8_t> inputBuffer = info[0].As<Napi::Buffer<uint8_t>>();
        std::vector<uint8_t> inputStreamBuffer(inputBuffer.Length());
        memcpy(inputStreamBuffer.data(), inputBuffer.Data(), inputStreamBuffer.size());
        sc::BufferStream inputStream(&inputStreamBuffer);

        std::vector<uint8_t> outputBuffer;
        sc::BufferStream outputStream(&outputBuffer);

        sc::Decompressor::commonDecompress(inputStream, outputStream);

        Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, outputBuffer.data(), outputBuffer.size());
        inputStream.close();
        outputStream.close();

        return buffer;
    }
}