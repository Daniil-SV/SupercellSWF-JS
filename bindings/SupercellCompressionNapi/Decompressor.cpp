#include "SupercellCompression.h"

#include <SupercellBytestream.h>

#include <iostream>

#include "Utils/node_binding/stl.h"

namespace scNapi
{
    Napi::Value SupercellCompression::decompressFile(const Napi::CallbackInfo& info)
    {
        std::string outputPath;
        sc::Decompressor::decompress(ToNativeValue<std::string>(info[0]), outputPath);

        return ToJSValue(info, outputPath);
    }

    Napi::Value SupercellCompression::decompress(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        /* Node.js Buffer to C++ Vector */
        std::vector<uint8_t> inputBuffer = TypeConvertor<std::vector<uint8_t>>::ToNativeValue(info[0]);
        sc::BufferStream inputStream(&inputBuffer);

        std::vector<uint8_t> outputBuffer;
        sc::BufferStream outputStream(&outputBuffer);

        sc::Decompressor::decompress(inputStream, outputStream);

        inputStream.close();
        outputStream.close();

        return TypeConvertor<std::vector<uint8_t>>::ToJSBuffer(info, outputBuffer);;
    }

    Napi::Value SupercellCompression::commonDecompress(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        std::vector<uint8_t> inputBuffer = TypeConvertor<std::vector<uint8_t>>::ToNativeValue(info[0]);
        sc::BufferStream inputStream(&inputBuffer);

        std::vector<uint8_t> outputBuffer;
        sc::BufferStream outputStream(&outputBuffer);

        sc::Decompressor::commonDecompress(inputStream, outputStream);

        inputStream.close();
        outputStream.close();

        return TypeConvertor<std::vector<uint8_t>>::ToJSBuffer(info, outputBuffer);;
    }
}