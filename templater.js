var Templater = (function() {
    function Templater() {
    }


    Templater.prototype.container;

    Templater.prototype.isScrolling = false;

    Templater.prototype.photoElHeigth = 245;

    Templater.prototype.setPhotoElHeigth = function(heigth) {
        this.photoElHeigth = heigth;
    }

    Templater.prototype.container;


    Templater.prototype.startScrolling = function() {
        this.isScrolling = true;
    };

    Templater.prototype.stopScrolling = function() {
        this.isScrolling = false;
    };

    Templater.prototype.createPhotoNode = function(item) {}

    Templater.prototype.appendItems = function(items) {
        var nodes = [];
        var index = this.container.lastChild ? +this.container.lastChild.dataset.index + 1: 0;
        items.forEach(function(item) {
            var node = this.createPhotoNode(item, index);
            this.container.appendChild(node);
            nodes.push(node);

            index++;
        }.bind(this));

        return nodes;
    };

    Templater.prototype.prependItems = function(items) {
        var nodes = [];
        var index = this.container.firstChild ? +this.container.firstChild.dataset.index - 1: 0;
        items.reverse().map(function(item) {
            var node = this.createPhotoNode(item, index);
            this.container.insertBefore(node, this.container.firstChild);
            nodes.unshift(node);
            index--;
        }.bind(this));

        return nodes;
    };


    Templater.prototype.move = function(direction, cb) {

        var marginTop = direction == 'down' ? 0 : -this.photoElHeigth;
        this.container.style.marginTop = marginTop + 'px';

        this.startScrolling();

        var interval = setInterval(function() {

            marginTop = direction == 'down' ? marginTop - 5 : marginTop + 5;
            this.container.style.marginTop = marginTop + 'px';

            if((direction == 'down' && marginTop<=-this.photoElHeigth) || (direction == 'top' && marginTop>=0)) {
                clearInterval(interval);
                cb();
                if(this.onMoveEnd) {
                    this.onMoveEnd();
                }
                this.container.style.marginTop = '0px';
                this.stopScrolling();
            }

        }.bind(this), 10);
    }



    return Templater;
})();
