#include "SupercellCompression.h"

namespace scNapi
{
    Napi::Value SupercellCompression::compressFile(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        sc::CompressorError result = sc::Compressor::compress(
            ToNativeValue<std::string>(info[0]),
            ToNativeValue<std::string>(info[1]),
            (sc::CompressionSignature)ToNativeValue<uint8_t>(info[2]));

        Utils::processCompressorError(env, result);

        return env.Undefined();
    }

    Napi::Value SupercellCompression::compress(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        /* Node.js Buffer to C++ Vector */
        Napi::Buffer<uint8_t> inputBuffer = info[0].As<Napi::Buffer<uint8_t>>();
        std::vector<uint8_t> inputStreamBuffer(inputBuffer.Length());
        memcpy(inputStreamBuffer.data(), inputBuffer.Data(), inputStreamBuffer.size());
        sc::BufferStream inputStream(&inputStreamBuffer);

        /* Wrapping it to BufferStream */
        std::vector<uint8_t> outputBuffer;
        sc::BufferStream outputStream(&outputBuffer);

        sc::CompressorError result = sc::Compressor::compress(inputStream, outputStream, (sc::CompressionSignature)info[1].ToNumber().Uint32Value());
        Utils::processCompressorError(env, result);

        /* Vector to buffer */
        Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, outputBuffer.data(), outputBuffer.size());

        inputStream.close();
        outputStream.close();

        return buffer;
    }

    Napi::Value SupercellCompression::commonCompress(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        /* Node.js Buffer to C++ Vector */
        Napi::Buffer<uint8_t> inputBuffer = info[0].As<Napi::Buffer<uint8_t>>();
        std::vector<uint8_t> inputStreamBuffer(inputBuffer.Length());
        memcpy(inputStreamBuffer.data(), inputBuffer.Data(), inputStreamBuffer.size());
        sc::BufferStream inputStream(&inputStreamBuffer);

        /* Wrapping it to BufferStream */
        std::vector<uint8_t> outputBuffer;
        sc::BufferStream outputStream(&outputBuffer);

        sc::CompressorError result = sc::Compressor::commonCompress(
            inputStream,
            outputStream,
            (sc::CompressionSignature)ToNativeValue<uint8_t>(info[1]));
        Utils::processCompressorError(env, result);

        /* Vector to buffer */
        Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, outputBuffer.data(), outputBuffer.size());

        inputStream.close();
        outputStream.close();

        return buffer;
    }
}