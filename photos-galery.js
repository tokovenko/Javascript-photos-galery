var PhotosGalery = (function() {

    function PhotosGalery() {

        this.photos = [];
        this.list = [];
        this.photosPerRequest = 40;
        this.photosPerLine = 5;
        this.activePhotoIndex = 0;
        this.visibleLines = 3;
        this.activeClassName = 'active';

        this.loader;
        this.templater;

        this.setLoader = function(loader) {
            this.loader = loader;
        }

        this.setTemplater = function(templater) {
            this.templater = templater;
        }

        this.appendItems = function(items) {
            var list = this.templater.appendItems(items);
            this.photos = this.photos.concat(list);
        };

        this.prependItems = function(items) {
            var photos = this.templater.prependItems(items);
            this.photos = photos.concat(this.photos);
        };

        this.getPhoto = function(index) {
            return this.photos[index];
        };

        this.getFirstPhoto = function() {
            return this.photos[0];
        };

        this.getLastPhoto = function() {
            return this.photos.slice(-1)[0];
        };

        this.getFirstPhotoIndex = function() {
            return +this.getFirstPhoto().dataset.index;
        };

        this.getLastPhotoIndex = function() {
            return +this.getLastPhoto().dataset.index;
        };

        this.getList = function(from, sum) {
            return this.list.slice(from, from + sum);
        };

        this.getCurrentLine = function() {
            return parseInt((this.activePhotoIndex + 1) / this.photosPerLine - 0.01) + 1;
        };

        this.setActivePhotoIndex = function(index) {
            this.activePhotoIndex = index;
        };

        this.getActivePhoto = function() {
            return this.getPhoto(this.activePhotoIndex);
        };


        this.isPenultimateLine = function() {
            var index = this.getLastPhotoIndex();
            return (this.list.length-index) <= (this.photosPerLine*2) && (this.list.length-index) >= this.photosPerLine;
        }


        this.loadMorePhotos = function() {
            this.loader.getPhotos(this.list.length, this.photosPerRequest, function(items) {
                this.list = this.list.concat(items);
                if(this.activePhotoIndex > this.photosPerLine*2) {
                    var lastIndex = this.getLastPhotoIndex();
                    var items = this.getList(lastIndex+1, this.photosPerLine);
                    this.appendItems(items);
                    this.setActivePhotoIndex(this.activePhotoIndex);
                }
            }.bind(this));
        }

        this.removeFirtsLine = function() {
            this.photos.splice(0, this.photosPerLine).map(function(item) {
                item.remove();
            });
        };

        this.removeLastLine = function() {
            var left = this.photos.length % this.photosPerLine;
            var list = this.photos.splice(left==0 ? -this.photosPerLine : -left);
            list.map(function(item) {
                item.remove();
            });
        };

        this.onMoveToTheLastLine = function() {
            var lastIndex = this.getLastPhotoIndex();
            var newPhotos = this.getList(lastIndex+1, this.photosPerLine);

            if(newPhotos.length > 0 || this.list.length/this.photos.length <= this.photosPerLine) {

                this.appendItems(newPhotos);
                this.setActivePhotoIndex(this.activePhotoIndex - this.photosPerLine);

                this.templater.move('down', function() {
                    this.removeFirtsLine();

                    if(this.isPenultimateLine()) {
                        this.loadMorePhotos();
                    }
                }.bind(this));

            }
        }

        this.onMoveToTheFirstLine = function() {
            var firstIndex = this.getFirstPhotoIndex();
            var newPhotos = this.list.slice(firstIndex-5, firstIndex);

            this.prependItems(newPhotos);
            this.setActivePhotoIndex(this.activePhotoIndex + newPhotos.length);

            this.templater.move('top', function() {
                this.removeLastLine();
            }.bind(this));
        }

        this.setActivePhoto = function(index) {

            this.getActivePhoto().classList.remove(this.activeClassName);
            this.getPhoto(index).classList.add(this.activeClassName);
            this.setActivePhotoIndex(index);

            var currentLine = this.getCurrentLine();

            if(currentLine == this.visibleLines) {
                this.onMoveToTheLastLine();
            } else if(currentLine == 1 && this.getFirstPhotoIndex() > 0) {
                this.onMoveToTheFirstLine();
            }

        };

        this.moveLeft = function() {
            if(this.activePhotoIndex > 0) {
                this.setActivePhoto(this.activePhotoIndex - 1);
            }
        };

        this.moveDown = function() {
            var index = this.activePhotoIndex + this.photosPerLine;
            if((this.photos.length - 1) >= index) {
                this.setActivePhoto(index);
            }
        };

        this.moveUp = function() {
            var index = this.activePhotoIndex - this.photosPerLine;
            if(index >= 0) {
                this.setActivePhoto(index);
            }
        };

        this.moveRigth = function() {
            var index = this.photos.length - 1;
            if(this.activePhotoIndex < index) {
                this.setActivePhoto(this.activePhotoIndex + 1);
            }
        };

        this.run = function() {
            this.loader.getPhotos(0, 40, function(items) {
                this.list = items;
                var photos = this.getList(0, this.photosPerLine*this.visibleLines + this.photosPerLine)
                this.appendItems(photos);
                this.setActivePhoto(this.activePhotoIndex);
            }.bind(this));
        }

    }

    return PhotosGalery;

})();
