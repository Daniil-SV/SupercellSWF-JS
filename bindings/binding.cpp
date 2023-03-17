#include "string"
#include <napi.h>

#include "SupercellCompressionNapi/SupercellCompression.h"
#include "SupercellFlashNapi/SupercellSWF.h"

#include "SupercellFlashNapi/objects/ExportName.h"
#include "SupercellFlashNapi/objects/Shape.h"
#include "SupercellFlashNapi/objects/SWFTexture.h"
#include "SupercellFlashNapi/objects/TextField.h"
#include "SupercellFlashNapi/objects/MovieClipModifier.h"
#include "SupercellFlashNapi/objects/MovieClip.h"
#include "SupercellFlashNapi/objects/MovieClipFrame.h"
#include "SupercellFlashNapi/transformation/MatrixBank.h"
#include "SupercellFlashNapi/transformation/Matrix2x3.h"
#include "SupercellFlashNapi/transformation/ColorTransform.h"

/* Node.js initialize */
Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  scNapi::SupercellCompression::Initialize(env, exports);
  scNapi::SupercellSWF::Initialize(env, exports);

  scNapi::ExportName::Initialize(env, exports);

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
  scNapi::MatrixBank::Initialize(env, exports);
  scNapi::Matrix2x3::Initialize(env, exports);
  scNapi::ColorTransform::Initialize(env, exports);

  /* MovieClip */
  scNapi::MovieClip::Initialize(env, exports);
  scNapi::DisplayObjectInstance::Initialize(env, exports);
  scNapi::MovieClipFrame::Initialize(env, exports);
  scNapi::MovieClipFrameElement::Initialize(env, exports);

  return exports;
}

NODE_API_MODULE(addon, Init)
