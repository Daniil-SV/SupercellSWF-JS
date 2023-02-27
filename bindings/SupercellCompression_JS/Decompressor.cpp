#include "SupercellCompression.h"

namespace scNapi
{
    Napi::Value SupercellCompression::decompressFile(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        std::string outputPath;
        sc::CompressorError result = sc::Decompressor::decompress(ToNativeValue<std::string>(info[0]), outputPath, nullptr);

        if (!Utils::processCompressorError(env, result))
        {
            return env.Undefined();
        }
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

        sc::CompressedSwfProps header;
        sc::CompressorError compresssorError = sc::Decompressor::decompress(inputStream, outputStream, &header);
        Utils::processCompressorError(env, compresssorError);

        Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, outputBuffer.data(), outputBuffer.size());
        inputStream.close();
        outputStream.close();

        Napi::Object props = Napi::Object::New(env);

        props.Set("id", Napi::Buffer<uint8_t>::Copy(env, header.id.data(), header.id.size()));
        props.Set("signature", Napi::Number::New(env, (uint32_t)header.signature));
        props.Set("metadata", Napi::Buffer<uint8_t>::Copy(env, header.metadata.data(), header.metadata.size()));
        props.Set("sign", Napi::Buffer<uint8_t>::Copy(env, header.sign.data(), header.sign.size()));

        Napi::Array result = Napi::Array::New(env, 2);
        result.Set((uint32_t)0, buffer);
        result.Set(1, props);

        return result;
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

        sc::CompressorError result = sc::Decompressor::commonDecompress(inputStream, outputStream);
        Utils::processCompressorError(env, result);

        Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, outputBuffer.data(), outputBuffer.size());
        inputStream.close();
        outputStream.close();

        return buffer;
    }
}