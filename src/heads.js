import _ from 'lodash';

const Heads = {}
Heads.each = function(collection, callback) {
    if (_(collection).isArray()) {
        _.each(collection, function(element) {
            Heads.each(element, callback);
        });
    } else if (_(collection).isObject()) {
        _.each(collection, function(subcollection, k) {
            if (k === 'head') {
                callback(subcollection, collection);
            } else if (_(subcollection).isArray || _(subcollection).isObject()) {
                Heads.each(subcollection, callback)
            }
        });
    }
};

Heads.eachWithIndex = function(collection, callback) {
    var i = 0;
    Heads.each(collection, function(subcollection, collection) {
        callback.apply(null, [subcollection, collection, i])
        i++;
    })
};

export default Heads;