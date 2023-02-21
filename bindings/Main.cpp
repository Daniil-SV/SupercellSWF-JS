#include "string"
#include <napi.h>

#include "SupercellCompression_JS/SupercellCompression.h"
#include "SupercellFlash_JS/SupercellSWF.h"
#include "SupercellFlash_JS/common/Export.h"
#include "SupercellFlash_JS/tag/Shape.h"
#include "SupercellFlash_JS/tag/SWFTexture.h"

/* Node.js initialize */
Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  scNapi::SupercellCompression::Initialize(env, exports);
  scNapi::SupercellSWF::Initialize(env, exports);

  scNapi::Export::Initialize(env, exports);

  /* Shapes */
  scNapi::Shape::Initialize(env, exports);
  scNapi::ShapeDrawBitmapCommand::Initialize(env, exports);
  scNapi::ShapeDrawBitmapCommandVertex::Initialize(env, exports);

  /* Texture */
  scNapi::SWFTexture::Initialize(env, exports);

	return exports;
}

NODE_API_MODULE(addon, Init)
