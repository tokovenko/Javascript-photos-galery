var WheelControl = (function() {

    var time = getTimestamp();
    var currentTime = time;

    function WheelControl(galery) {
        galery.templater.container.addEventListener('wheel', function(e) {

            currentTime = getTimestamp();

            if(!galery.templater.isScrolling && (currentTime - time) > 300) {
                var delta = e.deltaY || e.wheelDelta;

                if(delta<0) {
                    galery.moveUp();
                } else if(delta>0) {
                    galery.moveDown();
                }

                currentTime = time;
            }

            galery.templater.onMoveEnd = function() {
                time = getTimestamp();
            }

        });
    }

    function getTimestamp() {
        return  (new Date()).getTime();
    }

    return WheelControl;


})();
