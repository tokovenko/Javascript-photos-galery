var FlickrTemplater = (function() {

     function FlickrTemplater(container) {

        this.container = container;

        this.createPhotoNode = function(item, index) {
            var node = document.createElement("div");
            node.classList.add('photo');
            node.classList.add('photo-item' + index);

            var img = document.createElement("img");
            img.src = item.src;

            node.appendChild(img);
            node.dataset.index = index;

            return node;
        };

    }

    FlickrTemplater.prototype = Object.create(Templater.prototype);

    return FlickrTemplater;

})();
