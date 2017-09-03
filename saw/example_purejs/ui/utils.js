var Utils = {
    getActivePoolID: function() {
        return $(".pool-container[data!='']").attr('data');
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
	replaceImages: function() {

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
    }
}
