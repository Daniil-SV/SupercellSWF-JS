#include "string"
#include <napi.h>

#include "SupercellCompression_JS/SupercellCompression.h"
#include "SupercellFlash_JS/SupercellSWF.h"
#include "SupercellFlash_JS/common/Export.h"

/* Node.js initialize */
Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  scNapi::SupercellCompression::Initialization(env, exports);
  scNapi::SupercellSWF::Initialize(env, exports);
  scNapi::Export::Initialize(env, exports);

	return exports;
}

NODE_API_MODULE(addon, Init)
