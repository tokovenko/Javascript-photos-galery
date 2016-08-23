var KeyUpControl = (function() {

    function KeyUpControl(galery) {
        window.addEventListener('keyup', function(e) {
            var keyCodes = {
                code37: function() {
                    galery.moveLeft();
                },
                code38: function() {
                    galery.moveUp();
                },
                code39: function() {
                    galery.moveRigth();
                },
                code40: function() {
                    galery.moveDown();
                }
            };

            var code = 'code' + e.keyCode;
            if(keyCodes[code]) {
                e.preventDefault();
                if(!galery.templater.isScrolling) {
                    keyCodes[code]();
                }
            }
        });
    }

    return KeyUpControl;


})();
