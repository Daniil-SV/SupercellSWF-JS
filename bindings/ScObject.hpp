#pragma once

namespace scNapi {
    template <typename T>
    class ScObject {
        virtual T* get_parent() = 0;
    };
}