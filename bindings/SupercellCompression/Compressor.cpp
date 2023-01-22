#include "SupercellCompression.h"

namespace scNode
{
    Napi::Value SupercellCompression::compressFile(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env();

        if (info.Length() < 3)
        {
            Napi::TypeError::New(env, "Wrong number of arguments")
                .ThrowAsJavaScriptException();
            return env.Undefined();
        }

        if (!info[0].IsString() || !info[1].IsString() || !info[2].IsNumber())
        {
            Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        sc::CompressorError result = sc::Compressor::compress(
            info[0].ToString().Utf8Value(),
            info[1].ToString().Utf8Value(),
            static_cast<sc::CompressionSignature>(info[2].ToNumber().Int32Value()));

        if (result != sc::CompressorError::OK)
        {
            Napi::TypeError::New(env, "Failed to compress file").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        return env.Undefined();
    }

    Napi::Value SupercellCompression::compress(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env();

        if (info.Length() < 2)
        {
            Napi::TypeError::New(env, "Wrong number of arguments")
                .ThrowAsJavaScriptException();
            return env.Undefined();
        }

        if (!info[0].IsBuffer())
        {
            Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        /* Node.js Buffer to C++ Vector */
        Napi::Buffer<uint8_t> inputBuffer = info[0].As<Napi::Buffer<uint8_t>>();
        std::vector<uint8_t> inputStreamBuffer(inputBuffer.Length());
        memcpy(inputStreamBuffer.data(), inputBuffer.Data(), inputStreamBuffer.size());
        sc::BufferStream inputStream(&inputStreamBuffer);

        /* Wrapping it to BufferStream */
        std::vector<uint8_t> outputBuffer;
        sc::BufferStream outputStream(&outputBuffer);
        
        sc::CompressorError result;
        /* If second argument is signature index */
        if (info[1].IsNumber())
        {
            result = sc::Compressor::compress(inputStream, outputStream, static_cast<sc::CompressionSignature>(info[1].ToNumber().Uint32Value()));
        }
        /* Else error. Unknown argument type */
        else
        {
            Napi::TypeError::New(
                env,
                "Second argument is wrong! Must be CompressedSwfProps or number(signature index).")
                .ThrowAsJavaScriptException();
            return env.Undefined();
        }
        
        /* If result received error */
        if (result != sc::CompressorError::OK)
        {
            Napi::TypeError::New(env, "Failed to decompress file!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        /* Vector to buffer */
        Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, outputBuffer.data(), outputBuffer.size());

        inputStream.close();
        outputStream.close();

        return buffer;
    }
}