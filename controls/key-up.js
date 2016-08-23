var KeyUpControl = (function() {

    function KeyUpControl(gallery) {
        window.addEventListener('keyup', function(e) {
            var keyCodes = {
                code37: function() {
                    gallery.moveLeft();
                },
                code38: function() {
                    gallery.moveUp();
                },
                code39: function() {
                    gallery.moveRigth();
                },
                code40: function() {
                    gallery.moveDown();
                }
            };

            var code = 'code' + e.keyCode;
            if(keyCodes[code]) {
                e.preventDefault();
                if(!gallery.templater.isScrolling) {
                    keyCodes[code]();
                }
            }
        });
    }

    return KeyUpControl;


})();
