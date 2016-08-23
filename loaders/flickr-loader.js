var FlickrLoader = (function() {

    var loaderCallBack;

    function FlickrLoader(apiKey, search) {

        this.getPhotos = function(from, sum, cb) {

            var page = Math.ceil(from / sum) + 1;
            var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + encodeURI(apiKey) + '&tags=' + encodeURI(search) + '&format=json&jsoncallback=FlickrLoader.jsonFlickrApi&per_page=' + sum + '&page=' + page;
            var script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);

            loaderCallBack = cb;
        };
    }

    FlickrLoader.jsonFlickrApi = function(data) {
        if(loaderCallBack && data.photos && data.stat=='ok') {
            var photos = [];
            data.photos.photo.map(function(photo) {
                photos.push({
                    src: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
                });
            })
            loaderCallBack(photos)
            loaderCallBack = null;
        }
    };

    return FlickrLoader;

})();
