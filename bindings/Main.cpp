#include "string"
#include <napi.h>

#include "SupercellCompression/SupercellCompression.h"
#include "SupercellFlash/SupercellSWF.h"

/* Node.js initialize */
Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  scNode::SupercellCompression::Initialize(env, exports);
  scNode::SupercellSWF::Initialize(env, exports);

	return exports;
}

NODE_API_MODULE(addon, Init)
