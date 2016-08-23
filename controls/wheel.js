var WheelControl = (function() {

    var time = getTimestamp();
    var currentTime = time;

    function WheelControl(gallery) {
        gallery.templater.container.addEventListener('wheel', function(e) {

            currentTime = getTimestamp();

            if(!gallery.templater.isScrolling && (currentTime - time) > 300) {
                var delta = e.deltaY || e.wheelDelta;

                if(delta<0) {
                    gallery.moveUp();
                } else if(delta>0) {
                    gallery.moveDown();
                }

                currentTime = time;
            }

            gallery.templater.onMoveEnd = function() {
                time = getTimestamp();
            }

        });
    }

    function getTimestamp() {
        return  (new Date()).getTime();
    }

    return WheelControl;


})();
