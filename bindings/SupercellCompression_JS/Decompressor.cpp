#include "SupercellCompression.h"

namespace scNapi
{
    Napi::Value SupercellCompression::decompressFile(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        if (!info[0].IsString())
        {
            Napi::TypeError::New(env, "First argument must be a String!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        std::string outputPath;
        sc::CompressorError result = sc::Decompressor::decompress(info[0].ToString().Utf8Value(), outputPath);

        if (!Utils::processCompressorError(env, result))
        {
            return env.Undefined();
        }
        return Napi::String::New(env, outputPath);

    }

    Napi::Value SupercellCompression::decompress(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        if (!info[0].IsBuffer())
        {
            Napi::TypeError::New(env, "First argument must be a Buffer!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        Napi::Buffer<uint8_t> inputBuffer = info[0].As<Napi::Buffer<uint8_t>>();
        std::vector<uint8_t> inputStreamBuffer(inputBuffer.Length());
        memcpy(inputStreamBuffer.data(), inputBuffer.Data(), inputStreamBuffer.size());
        sc::BufferStream inputStream(&inputStreamBuffer);

        std::vector<uint8_t> outputBuffer;
        sc::BufferStream outputStream(&outputBuffer);

        //sc::CompressorError result = sc::Decompressor::decompress(inputStream, outputStream);
        //Utils::processCompressorError(env, result);

        Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, inputStreamBuffer.data(), inputStreamBuffer.size());
        inputStream.close();
        outputStream.close();

        return buffer;
    }

    Napi::Value SupercellCompression::commonDecompress(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        if (!info[0].IsBuffer())
        {
            Napi::TypeError::New(env, "First argument must be a Buffer!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

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

    Napi::Value SupercellCompression::getProps(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        if (!info[0].IsBuffer())
        {
            Napi::TypeError::New(env, "First argument must be a Buffer!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        Napi::Buffer<uint8_t> buffer = info[0].As<Napi::Buffer<uint8_t>>();
        std::vector<uint8_t> streamBuffer(buffer.Length());
        memcpy(streamBuffer.data(), buffer.Data(), streamBuffer.size());
        sc::BufferStream stream(&streamBuffer);

        sc::CompressedSwfProps scProps = sc::Decompressor::getHeader(stream);
        Napi::Object props = Napi::Object::New(env);

        props.Set("id", Napi::Buffer<uint8_t>::Copy(env, scProps.id.data(), scProps.id.size()));
        props.Set("signature", Napi::Number::New(env, scProps.signature));
        props.Set("metadata", Napi::Buffer<uint8_t>::Copy(env, scProps.metadata.data(), scProps.metadata.size()));
        props.Set("sign", Napi::Buffer<uint8_t>::Copy(env, scProps.sign.data(), scProps.sign.size()));

        stream.close();

        return props;
    }
}