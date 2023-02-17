const {
    Vector
} = require("../../lib/node/Vector");

function initVector(array) {
    return new Vector(
        {
            context: array,
            get_item: function(index) {
                return array[index];
            },
            insert_item: function(item, position) {
                array.splice(position, 0, item);
            },
            remove_item: function(index) {
                array.splice(index, 1);
            },
            get_length: function() {
                return array.length;
            },
            set_length: function(num) {
                array.length = num;
            }
        }
    )
}

module.exports.initVector = initVector;