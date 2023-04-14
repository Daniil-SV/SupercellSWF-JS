#include "string"
#include <napi.h>

#include "SupercellCompressionNapi/SupercellCompression.h"
#include "SupercellFlashNapi/SupercellSWF.hpp"

#include "SupercellFlashNapi/objects/ExportName.hpp"
#include "SupercellFlashNapi/objects/Shape.hpp"
#include "SupercellFlashNapi/objects/SWFTexture.hpp"
#include "SupercellFlashNapi/objects/TextField.hpp"
#include "SupercellFlashNapi/objects/MovieClipModifier.hpp"
#include "SupercellFlashNapi/objects/MovieClip.hpp"
#include "SupercellFlashNapi/objects/MovieClipFrame.hpp"
#include "SupercellFlashNapi/objects/MovieClipFrameElement.hpp"
#include "SupercellFlashNapi/objects/DisplayObjectInstance.hpp"
#include "SupercellFlashNapi/transformation/MatrixBank.hpp"
#include "SupercellFlashNapi/transformation/Matrix2x3.hpp"
#include "SupercellFlashNapi/transformation/ColorTransform.hpp"

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
