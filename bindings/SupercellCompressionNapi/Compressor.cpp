#include "SupercellCompressionNapi/SupercellCompression.h"

#include <SupercellBytestream.h>

#include "Utils/node_binding/stl.h"

using namespace node_binding;

namespace scNapi
{
    Napi::Value SupercellCompression::compressFile(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        std::vector<uint8_t>* metadata = nullptr;

        if (!info[3].IsUndefined())
        {
            Napi::Buffer<uint8_t> metadataNapi = info[3].As<Napi::Buffer<uint8_t>>();
            metadata = new std::vector<uint8_t>(metadataNapi.Length());
            memcpy(metadata->data(), metadataNapi.Data(), metadata->size());
        }

        sc::Compressor::compress(
            ToNativeValue<std::string>(info[0]),
            ToNativeValue<std::string>(info[1]),
            (sc::CompressionSignature)ToNativeValue<uint8_t>(info[2]),
            metadata);

        return env.Undefined();
    }

    Napi::Value SupercellCompression::compress(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        /* Node.js Buffer to C++ Vector */
        
        std::vector<uint8_t> inputBuffer = TypeConvertor<std::vector<uint8_t>>::ToNativeValue(info[0]);
        sc::BufferStream inputStream(&inputBuffer);

        /* Wrapping it to BufferStream */
        std::vector<uint8_t> outputBuffer;
        sc::BufferStream outputStream(&outputBuffer);

        /* Metadata */
        std::vector<uint8_t>* metadata = nullptr;

        if (!info[2].IsUndefined())
        {
            Napi::Buffer<uint8_t> metadataNapi = info[2].As<Napi::Buffer<uint8_t>>();
            metadata = new std::vector<uint8_t>(metadataNapi.Length());
            memcpy(metadata->data(), metadataNapi.Data(), metadata->size());
        }

        sc::Compressor::compress(
            inputStream,
            outputStream,
            (sc::CompressionSignature)ToNativeValue<uint8_t>(info[1]),
            metadata);

        inputStream.close();
        outputStream.close();

        return TypeConvertor<std::vector<uint8_t>>::ToJSBuffer(info, outputBuffer);
    }

    Napi::Value SupercellCompression::commonCompress(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        /* Node.js Buffer to C++ Vector */
        std::vector<uint8_t> inputBuffer = TypeConvertor<std::vector<uint8_t>>::ToNativeValue(info[0]);
        sc::BufferStream inputStream(&inputBuffer);

        /* Wrapping it to BufferStream */
        std::vector<uint8_t> outputBuffer;
        sc::BufferStream outputStream(&outputBuffer);

        sc::Compressor::commonCompress(
            inputStream,
            outputStream,
            (sc::CompressionSignature)ToNativeValue<uint8_t>(info[1]));

        inputStream.close();
        outputStream.close();

        return TypeConvertor<std::vector<uint8_t>>::ToJSBuffer(info, outputBuffer);;
    }
}