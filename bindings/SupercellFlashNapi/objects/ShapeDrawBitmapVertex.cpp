#include "ShapeDrawBitmapVertex.hpp"

namespace scNapi {
    PROPERTY(
        ShapeDrawBitmapCommandVertex,
        x,
        parent->x(ToNativeValue<float>(value)),
        return ToJSValue(info, parent->x())
    );

    PROPERTY(
        ShapeDrawBitmapCommandVertex,
        y,
        parent->y(ToNativeValue<float>(value)),
        return ToJSValue(info, parent->y())
    );

    PROPERTY(
        ShapeDrawBitmapCommandVertex,
        u,
        parent->u(ToNativeValue<float>(value)),
        return ToJSValue(info, parent->u())
    );

    PROPERTY(
        ShapeDrawBitmapCommandVertex,
        v,
        parent->v(ToNativeValue<float>(value)),
        return ToJSValue(info, parent->v())
    );
}