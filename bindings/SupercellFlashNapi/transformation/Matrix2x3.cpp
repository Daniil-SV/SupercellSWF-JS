#include "Matrix2x3.hpp"

namespace scNapi {
    PROPERTY(
        Matrix2x3,
        a,
        parent->a = ToNativeValue<float>(value),
        return ToJSValue(info, parent->a)
    );

    PROPERTY(
        Matrix2x3,
        b,
        parent->b = ToNativeValue<float>(value),
        return ToJSValue(info, parent->b)
    );

    PROPERTY(
        Matrix2x3,
        c,
        parent->c = ToNativeValue<float>(value),
        return ToJSValue(info, parent->c)
    );

    PROPERTY(
        Matrix2x3,
        d,
        parent->d = ToNativeValue<float>(value),
        return ToJSValue(info, parent->d)
    );

    PROPERTY(
        Matrix2x3,
        tx,
        parent->tx = ToNativeValue<float>(value),
        return ToJSValue(info, parent->tx)
    );

    PROPERTY(
        Matrix2x3,
        ty,
        parent->ty = ToNativeValue<float>(value),
        return ToJSValue(info, parent->ty)
    );
}