#include "SupercellCompression.h"

namespace scNode
{
    Napi::Value SupercellCompression::compressFile(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env();

        if (!info[0].IsString() || !info[1].IsString())
        {
            Napi::TypeError::New(env, "First and second arguments must be a String!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        if (!info[2].IsNumber())
        {
            Napi::TypeError::New(env, "Third argument must be a Number!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        sc::CompressorError result = sc::Compressor::compress(
            info[0].ToString().Utf8Value(),
            info[1].ToString().Utf8Value(),
            static_cast<sc::CompressionSignature>(info[2].ToNumber().Int32Value()));

        Utils::processCompressorError(env, result);

        return env.Undefined();
    }

    Napi::Value SupercellCompression::compress(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env();

        if (!info[0].IsBuffer())
        {
            Napi::TypeError::New(env, "First argument must be a Buffer!").ThrowAsJavaScriptException();
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
        else if (info[1].IsObject())
        {
            sc::CompressedSwfProps header;
            Napi::Object props = info[1].ToObject();

            if (props.Has("id"))
            {
                Napi::Buffer<uint8_t> idBuffer = props.Get("id").As<Napi::Buffer<uint8_t>>();
                header.id = std::vector<uint8_t>(idBuffer.Length());
                memcpy(header.id.data(), idBuffer.Data(), header.id.size());
            }

            if (props.Has("signature"))
            {
                header.signature = props.Get("signature").ToNumber().Uint32Value();
            }

            if (props.Has("metadata"))
            {
                Napi::Buffer<uint8_t> metadataBuffer = props.Get("metadata").As<Napi::Buffer<uint8_t>>();
                header.metadata = std::vector<uint8_t>(metadataBuffer.Length());
                memcpy(header.metadata.data(), metadataBuffer.Data(), header.metadata.size());
            }

            if (props.Has("sign"))
            {
                Napi::Buffer<uint8_t> signBuffer = props.Get("metadata").As<Napi::Buffer<uint8_t>>();
                if (signBuffer.Length() == 64)
                {
                    header.sign = std::vector<uint8_t>(signBuffer.Length());
                    memcpy(header.sign.data(), signBuffer.Data(), header.sign.size());
                }
            }

            result = sc::Compressor::compress(inputStream, outputStream, header);
        }
        /* Else error. Unknown argument type */
        else
        {
            Napi::TypeError::New(
                env,
                "Second argument is wrong! Must be CompressedSwfProps or Number.")
                .ThrowAsJavaScriptException();
            return env.Undefined();
        }

        Utils::processCompressorError(env, result);

        /* Vector to buffer */
        Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, outputBuffer.data(), outputBuffer.size());

        inputStream.close();
        outputStream.close();

        return buffer;
    }

    Napi::Value SupercellCompression::commonCompress(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env();

        if (!info[0].IsBuffer())
        {
            Napi::TypeError::New(env, "First argument must be a Buffer!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        if (!info[1].IsNumber())
        {
            Napi::TypeError::New(env, "Second argument must be a Number!").ThrowAsJavaScriptException();
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

        sc::CompressorError result = sc::Compressor::commonCompress(
            inputStream,
            outputStream,
            static_cast<sc::CompressionSignature>(info[1].ToNumber().Int32Value()));
        Utils::processCompressorError(env, result);

        /* Vector to buffer */
        Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, outputBuffer.data(), outputBuffer.size());

        inputStream.close();
        outputStream.close();

        return buffer;
    }
}