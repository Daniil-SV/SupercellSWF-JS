#include "string"
#include <napi.h>

#include "SupercellCompression_JS/SupercellCompression.h"
#include "SupercellFlash_JS/SupercellSWF.h"

/* Node.js initialize */
Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  scNapi::SupercellCompression::Init(env, exports);
  scNapi::SupercellSWF::Init(env, exports);
  //scNode::Export::Init(env, exports);

	return exports;
}

NODE_API_MODULE(addon, Init)
