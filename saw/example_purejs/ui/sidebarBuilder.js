function SidebarBuilder(pools) {
    this.init = function() {
        var skinBorders = {
            'wooden': '#70442c',
            'golden': '#70442c',
            'rainbow': '#2b2658'
        }
        var $sidebar = $('.sidebar');
        var $wheelText = $('#wheel-text');
        $sidebar.empty();

        $.each(pools, function (index, pool) {
            var formatedData = Utils.formatPoolData(pool);
            $sidebar.append(`
            <div class="pool-container" id="pool-container-${pool._code}">
                <div class="pool-name">${pool._name}</div>
                <img class="pool-image" width="100" height="100" src="${pool._icon}">
                <div class="spins-count">${formatedData.rewardsTicketCount} spins</div>
            </div>`
            );
            attachPoolIconHandler(pool);
        });

        $('.pool-container').first().trigger('click');
        animations.blinkingFlare();
        var arrowAnimation = animations.clickToSpinArrow();

        $('#spin-btn').click(function () {
			var elementsToReset = ['circle-svg', 'wheel-ring'];
			Utils.resetAnimations(elementsToReset);
            var numberPattern = /\d+/g;
            var spinsLeft = $wheelText.find('.spins-count').text().match(numberPattern)[0];

            if (spinsLeft && spinsLeft == 0) {
                return false;
            }
            if (spinsLeft - 1 == 1) {
                $(this).css('opacity', '.9');
            }
            $(this).css('visibility', 'hidden')
            $('#circle-svg').attr('data-status', 'running')
            $('#click-to-spin-arrow').css('visibility', 'hidden');
			var activePoolID = Utils.getActivePoolID();
            arrowAnimation.pause();
            animations.pulsedButton();
            legacySaWRender.onStartSpin(Number(activePoolID));
        })

        function attachPoolIconHandler(pool) {
			var poolCode = pool._code;
            $('#pool-container-' + poolCode).click(function () {
				var wheelID = $('.wheel').data('pool-id');
                // prevent re-running the wheel
                if (Utils.isWheelRunning() || poolCode == wheelID) {
                    return;
                }
                //remove currently selected wheel flag
                $('.pool-container').each(function (i, data) {
                    $(data).attr('data', '')
                });
                //attach clicked pool code as flag that is selected
                $(this).attr('data', poolCode);
				$('.wheel').attr('data-pool-id', poolCode)
                formattedData = Utils.formatPoolData(pool);
				$('#spin-btn').css('visibility', function() {
					return formattedData.rewardsTicketCount ? 'visible' : 'hidden'
				});

                $('#wheel-text .spins-count').text(formattedData.formatFreeSpins);
                $('#wheel-text .date').text(formattedData.formatExpirationDate);
                var skinName = pool._skinName;
				var pathToImage = `../saw-images-assets/${skinName}/${skinName}-`;

                $('.arrow-container img').attr('src', pathToImage + 'arrow.png')
                animations.clickToSpinArrow();

                $('.pointer-container img').attr('src', pathToImage + 'tick.png')
                $('#wheel-ring').css('background', 'url(' + pathToImage + 'wheel.png)')
                $('.wrapper').css({
                    'background-image': 'url(' + pathToImage + 'bg.jpg)',
                    'border': `18px solid ${skinBorders[skinName]}`,
					'border-image': `url(../saw-images-assets/round-light.png)`
                });

                legacySaWRender.onOpenPool(poolCode);
            });
        }
    }
    return this;
}
SidebarBuilder.prototype.updateCurrentActivePool = function(pools, activePoolID) {
    var $wheelText = $('#wheel-text');
    var pool = Utils.getPoolById(pools, activePoolID);
    var formattedData = Utils.formatPoolData(pool);
    if (formattedData.rewardsTicketCount) {
        $('#spin-btn').css('visibility', 'visible');
    }
    var $poolContainer = $('#pool-container-' + activePoolID);
    $poolContainer.find('.spins-count').text(formattedData.rewardsTicketCount + ' spins');
    $wheelText.find('.spins-count').text(formattedData.formatFreeSpins);
    $wheelText.find('.date').text(formattedData.formatExpirationDate);
};
