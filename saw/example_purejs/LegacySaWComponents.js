function LegacySaWComponents(legacySaWRender) {
    //cache pools count instead of crawling the DOM
    var cachePoolsCount;
    this.SaWPoolGrid = function() {
        var SideBar;

        this.setPools = function(totalTicketsCount, pools) {
            var currentPoolsCount = cachePoolsCount ? cachePoolsCount() : 0;
            if(pools) {
                var activePoolID = Utils.getActivePoolID();
                //update current active pool spins count and expiration date
                if(activePoolID  && currentPoolsCount === pools.length) {
                    Sidebar.updateCurrentActivePool(pools, activePoolID);
                } else {
                    //draw the sidebar only once, then update only needed elements
                    //redraw it only when new pool/s is/are coming
                    cachePoolsCount = function () {
                        return pools.length;
                    };
                    Sidebar = new SidebarBuilder(pools);

                    Sidebar.init();
                }
            }
        };
        return this;
    };

    this.SaWSpinsDialog = function() {
        this.setSectors = function(templateCode, prizes) {
			console.log('ZZZZZZZZZZZZZZZZz');
            new WheelBuilder(prizes);
        };
        return this;
    }

    this.SaWAnimationDialog = function(spinAnimationListener) {
        this.animate = function(pool, prize) {
            if(prize) {
                var onAnimationEnd = function () {
                    return spinAnimationListener.onSpinAnimationEnd(pool._code, prize);
                }
                console.log()
                animations.spinWheel(prize, onAnimationEnd, pool._sectorsCount);
            }
        }
        return this;
    }
    this.SaWPrizeDialog = function() {
        this.showPrize = function(prize) {
            console.log(prize)
            //     prizeDescription.empty();
            //     prizeDescription.append(prize ? prize._name + ' (' + prize._code + ')' + ' Type: ' + dictionary.getRandomRewardPrize(prize._prizeType) + ' Value: ' + prize._prizeValue : 'Nothing');
            //     prizeIcon.attr("src", prize._icon);
            //     prizeDialog.show();
        }
        //
        // prizeDialog.click(function() {
        //     prizeDialog.hide();
        // }.bind(this));

        return this;

    }
}
