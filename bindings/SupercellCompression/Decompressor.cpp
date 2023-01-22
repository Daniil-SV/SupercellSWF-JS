#include "SupercellCompression.h"

namespace scNode
{
    Napi::Value SupercellCompression::decompressFile(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env();

        if (info.Length() < 1)
        {
            Napi::TypeError::New(env, "Wrong number of arguments")
                .ThrowAsJavaScriptException();
            return env.Undefined();
        }

        if (!info[0].IsString())
        {
            Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        std::string outputPath;
        sc::CompressorError result = sc::Decompressor::decompress(info[0].ToString().Utf8Value(), outputPath);
        if (result != sc::CompressorError::OK)
        {
            Napi::TypeError::New(env, "Failed to decompress file!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        return Napi::String::New(env, outputPath);
    }

    Napi::Value SupercellCompression::decompress(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env();

        if (info.Length() < 1)
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

        Napi::Buffer<uint8_t> inputBuffer = info[0].As<Napi::Buffer<uint8_t>>();
        std::vector<uint8_t> inputStreamBuffer(inputBuffer.Length());
        memcpy(inputStreamBuffer.data(), inputBuffer.Data(), inputStreamBuffer.size());
        sc::BufferStream inputStream(&inputStreamBuffer);

        std::vector<uint8_t> outputBuffer;
        sc::BufferStream outputStream(&outputBuffer);

        sc::CompressorError result = sc::Decompressor::decompress(inputStream, outputStream);
        if (result != sc::CompressorError::OK)
        {
            Napi::TypeError::New(env, "Failed to decompress file!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, outputBuffer.data(), outputBuffer.size());
        inputStream.close();
        outputStream.close();

        return buffer;
    }

    Napi::Value SupercellCompression::commonDecompress(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env();

        if (info.Length() < 1)
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

        Napi::Buffer<uint8_t> inputBuffer = info[0].As<Napi::Buffer<uint8_t>>();
        std::vector<uint8_t> inputStreamBuffer(inputBuffer.Length());
        memcpy(inputStreamBuffer.data(), inputBuffer.Data(), inputStreamBuffer.size());
        sc::BufferStream inputStream(&inputStreamBuffer);

        std::vector<uint8_t> outputBuffer;
        sc::BufferStream outputStream(&outputBuffer);

        sc::CompressorError result = sc::Decompressor::commonDecompress(inputStream, outputStream);
        if (result != sc::CompressorError::OK)
        {
            Napi::TypeError::New(env, "Failed to decompress file!").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, outputBuffer.data(), outputBuffer.size());
        inputStream.close();
        outputStream.close();

        return buffer;
    }

    Napi::Value SupercellCompression::getProps(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env();

        if (info.Length() < 1)
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

        Napi::Buffer<uint8_t> buffer = info[0].As<Napi::Buffer<uint8_t>>();
        std::vector<uint8_t> streamBuffer(buffer.Length());
        memcpy(streamBuffer.data(), buffer.Data(), streamBuffer.size());
        sc::BufferStream stream(&streamBuffer);

        sc::CompressedSwfProps scProps = sc::Decompressor::getHeader(stream);
        Napi::Object props = Napi::Object::New(env);

        props.Set("id", Napi::Buffer<uint8_t>::Copy(env, scProps.id.data(), scProps.id.size()));
        props.Set("signature", Napi::Number::New(env, scProps.signature));
        props.Set("metadata", Napi::Buffer<uint8_t>::Copy(env, scProps.metadata.data(), scProps.metadata.size()));
        props.Set("hash", Napi::Buffer<uint8_t>::Copy(env, scProps.hash.data(), scProps.hash.size()));

        stream.close();

        return props;
    }
}