var Utils = {
    getActivePoolID: function() {
        return $(".pool-container[data !='']").attr('data');
    },
    getPoolById: function(pools, id) {
        return pools.find(function (pool) {
            return pool._code == id;
        });
    },
    resetAnimations: function(targets) {
        $.each(targets, function(i, target) {
            $('#'+target).css('transform','');
        });
    },
    formatPoolData: function(pool) {
        var randomRewardsTicketCount = pool._randomRewardsTickets.totalCount;
        if(randomRewardsTicketCount < 0) {
            randomRewardsTicketCount = 0;
        }

        return {
            formatFreeSpins: Formatter.formatFreeSpins(randomRewardsTicketCount),
            formatExpirationDate: Formatter.formatExpirationDate(pool._randomRewardsTickets.nearestExpirationDate),
            rewardsTicketCount: randomRewardsTicketCount
        }
    },
    isWheelRunning: function () {
        return $('#circle-svg').attr('data-status') == 'running';
    },

    adjustScale: function(_BASE_WIDTH, _BASE_HEIGHT) {
        var _SCREEN_WIDTH = window.innerWidth;
        var _SCREEN_HEIGHT = window.innerHeight;
        var scaleWidth = _SCREEN_WIDTH / _BASE_WIDTH;
        var scaleHeight = _SCREEN_HEIGHT / _BASE_HEIGHT;
        var scale = Math.min(scaleWidth, scaleHeight);

        if ((_SCREEN_WIDTH < _BASE_WIDTH) && (_SCREEN_HEIGHT < _BASE_HEIGHT)) {
            $("html").css({
                "zoom": scale,
                "-moz-transform": "scale(" + scale + ")"
            });
        }
        if ((_SCREEN_WIDTH < _BASE_WIDTH)) {
            $("html").css({
                "zoom": scale,
                "-moz-transform": "scale(" + scaleWidth + ")"
            });
        }
        if ((_SCREEN_HEIGHT < _BASE_HEIGHT)) {
            $("html").css({
                "zoom": scale,
                "-moz-transform": "scale(" + scaleHeight + ")"
            });
        }
    }

}
