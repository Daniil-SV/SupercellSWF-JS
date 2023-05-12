#include "MovieClip.hpp"

namespace scNapi
{
    PROPERTY(
        MovieClip,
        id,
        parent->id(ToNativeValue<uint16_t>(value)),
        return ToJSValue(info, parent->id())
    );

    PROPERTY(
        MovieClip,
        unknownFlag,
        parent->unknownFlag(ToNativeValue<bool>(value)),
        return ToJSValue(info, parent->unknownFlag())
    );

    PROPERTY(
        MovieClip,
        frameRate,
        parent->frameRate(ToNativeValue<uint8_t>(value)),
        return ToJSValue(info, parent->frameRate())
    );

    PROPERTY(
        MovieClip,
        matrixBankIndex,
        parent->matrixBankIndex(ToNativeValue<uint8_t>(value)),
        return ToJSValue(info, parent->matrixBankIndex())
    );

    PROPERTY(
        MovieClip,
        scalingGrid,
        {
            if (value.IsUndefined())
            {
                parent->scalingGrid(nullptr);
            }

            Napi::Object grid = value.As<Napi::Object>();
            sc::ScalingGrid* nativeGrid = new sc::ScalingGrid();

            if (grid.Has("x"))
            {
                TOSTRING("coc");
                nativeGrid->x = ToNativeValue<float>(grid.Get("x"));
            }

            if (grid.Has("y"))
            {
                nativeGrid->y = ToNativeValue<float>(grid.Get("y"));
            }

            if (grid.Has("width"))
            {
                nativeGrid->width = ToNativeValue<float>(grid.Get("width"));
            }

            if (grid.Has("height"))
            {
                nativeGrid->height = ToNativeValue<float>(grid.Get("height"));
            }

            parent->scalingGrid(nativeGrid);
        },
        {
            if (parent->scalingGrid() == nullptr)
            {
                return info.Env().Undefined();
            }

            Napi::Object grid = Napi::Object::New(info.Env());
            sc::ScalingGrid* nativeGrid = parent->scalingGrid();

            grid.Set("x", ToJSValue(info, nativeGrid->x));
            grid.Set("y", ToJSValue(info, nativeGrid->y));
            grid.Set("width", ToJSValue(info, nativeGrid->width));
            grid.Set("height", nativeGrid->height);

            return grid;
        }
        );
}