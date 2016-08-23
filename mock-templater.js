var MockTemplater = (function() {

    function MockTemplater(container) {

        this.container = container;

        this.createPhotoNode = function(item, index) {
            var node = document.createElement("div");
            node.classList.add('photo');
            node.classList.add('photo-item' + index);
            node.innerHTML = '<span>' + (item.src + 1) + '</span>';
            node.dataset.index = index;

            return node;
        };

    }

    MockTemplater.prototype = Object.create(Templater.prototype);

    return MockTemplater;
})();
