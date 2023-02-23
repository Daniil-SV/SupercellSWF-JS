#include "string"
#include <napi.h>

#include "SupercellCompression_JS/SupercellCompression.h"
#include "SupercellFlash_JS/SupercellSWF.h"
#include "SupercellFlash_JS/common/Export.h"
#include "SupercellFlash_JS/tag/Shape.h"
#include "SupercellFlash_JS/tag/SWFTexture.h"
#include "SupercellFlash_JS/tag/TextField.h"
#include "SupercellFlash_JS/tag/MovieClipModifier.h"
#include "SupercellFlash_JS/tag/Matrix2x3.h"
#include "SupercellFlash_JS/tag/ColorTransform.h"

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

  /* TextField */
  scNapi::TextField::Initialize(env, exports);

  /* MovieClips */
  scNapi::MovieClipModifier::Initialize(env, exports);

  /* MovieClip transforms */
  scNapi::Matrix2x3::Initialize(env, exports);
  scNapi::ColorTransform::Initialize(env, exports);

	return exports;
}

NODE_API_MODULE(addon, Init)
