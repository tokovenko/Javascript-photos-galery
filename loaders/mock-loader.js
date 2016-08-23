var MockLoader = (function() {

    return function MockLoader() {

        this.getPhotos = function(from, sum, cb) {
            setTimeout(function() {
                var items = [];

                for(var i=from; i<(from+sum); i++) {
                    items.push({src: i});
                }

                cb(items);
            }, 500);
        };

    }

})();
