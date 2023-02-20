#pragma once

#include <string>
#include <napi.h>
#include <iostream>
#include "Utils/Utils.hpp"

namespace scNapi
{
	class SupercellCompression: public Napi::ObjectWrap<SupercellCompression>
	{
	public:
		static void Initialize(Napi::Env& env, Napi::Object& target); // Addon initialization
		SupercellCompression(const Napi::CallbackInfo& info): Napi::ObjectWrap<SupercellCompression>(info) {};
		
		/* Decompressor functions */
		static Napi::Value decompressFile(const Napi::CallbackInfo& info);
		static Napi::Value decompress(const Napi::CallbackInfo& info);
		static Napi::Value commonDecompress(const Napi::CallbackInfo& info);
		static Napi::Value getProps(const Napi::CallbackInfo& info);

		/* Compressor functions */
		static Napi::Value compressFile(const Napi::CallbackInfo& info);
		static Napi::Value compress(const Napi::CallbackInfo& info);
		static Napi::Value commonCompress(const Napi::CallbackInfo& info);
	};
}
