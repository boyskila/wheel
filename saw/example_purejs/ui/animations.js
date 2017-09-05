var visibilityOptions = {
    "visibility": "hidden",
    "opacity": 0,
    "transition": "visibility 0s 1s, opacity 1s linear"
};

var animations = {
    spinWheel: function (prize, onAnimationEnd, sectorsCount) {
		var prizeSectorIndex = prize._sectors[0]._sectorIndex;
		anime({
			targets: '#wheel-ring',
			rotate: 3600 + prizeSectorIndex * (360 / sectorsCount) + 360 - 10,
			direction: 'normal',
			elasticity: 100,
			easing: [0.175, 0.885, 0.320, 1.075],
			duration: 7000
		})
		anime({
            targets: '#circle-svg',
            rotate: (3600 + prizeSectorIndex * (360 / sectorsCount) + 360) - ((360 / sectorsCount)/2 - 10),
            direction: 'normal',
            elasticity: 100,
            easing: [0.175, 0.885, 0.320, 1.075],
            duration: 7000,
            complete: function () {
                onAnimationEnd();
                $('#circle-svg').removeAttr('data-status');
                $('#prize-name').text(prize._name);
                $('.overlay h2').text('You Won');
                $('#prize-icon').attr('src', prize._icon);
                $('.overlay').css({
                    "visibility": "visible",
                    "opacity": 1
                });
                $(".overlay, .close").click(function() {
                    $(this).css(visibilityOptions);
                });
                $('#click-to-spin-arrow').css('visibility', 'visible');
                setTimeout(function() {
                    $('.overlay').css(visibilityOptions);
					var elementsToReset = ['spin-btn'];
					Utils.resetAnimations(elementsToReset);
                }, 15000);
            }
        });
    },
    pulsedButton: function() {
        anime.timeline({
            direction: 'alternate',
            loop: false,
            autoplay: true
        }).add({
            targets: '#spin-btn',
            scale: 0.9,
            duration: 100,
            direction: 'alternate',
            delay: 0,
            elasticity: 600,
            easing: "linear",
        }).add({
            targets: '#spin-btn',
            scale: 1,
            duration: 600,
            direction: 'alternate',
            delay: 0,
            elasticity: 600,
            easing: "linear",
        });
    },
    clickToSpinArrow: function() {
        var animation = anime({
            targets: '#click-to-spin-arrow',
            translateX: 25,
            translateY: -25,
            duration: 600,
            direction: 'alternate',
            easing: "linear",
            //loop: true,
        });
        return animation;
    },

    blinkingFlare: function() {
        anime({
            targets: '.flare',
            rotate: '1turn',
            duration: 1000,
            direction: 'normal',
            easing: "linear",
            loop: true,
            autoplay: true
        });
        anime({
            targets: '.flare',
            opacity: 0.2,
            duration: 1000,
            direction: 'normal',
            easing: "easeInOutBack",
            loop: true,
            autoplay: true
        });
    }
};
