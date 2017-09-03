function SidebarBuilder(pools) {
    this.init = function() {
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

        $('.pool-container').first().trigger('click')
        // animations.blinkingFlare();
        var arrowAnimation = animations.clickToSpinArrow();

        $('#spin-btn').click(function () {
            var numberPattern = /\d+/g;
            var spinsLeft = $wheelText.find('.spins-count').text().match(numberPattern)[0];

            if (spinsLeft && spinsLeft == 0) {
                return false;
            }
            if (spinsLeft - 1 == 1) {
                $(this).css('opacity', '.9');
            }
			$(this).css('visibility', 'hidden')
            $('#wheel').attr('data-status', 'running')
            $('#click-to-spin-arrow').css('visibility', 'hidden');

            arrowAnimation.pause();
            animations.pulsedButton();
            var activePoolID = Utils.getActivePoolID();
            legacySaWRender.onStartSpin(Number(activePoolID));
            var elementsToReset = ['circle-svg', 'spin-btn'];
            Utils.resetAnimations(elementsToReset)
        })

        function attachPoolIconHandler(pool) {
            $('#pool-container-' + pool._code).click(function () {
                // prevent re-running the wheel
                if (Utils.isWheelRunning()) {
                    return;
                }
                //remove currently selected wheel flag
                $('.pool-container').each(function (i, data) {
                    $(data).attr('data', '')
                });
                //attach clicked pool code as flag that is selected
                $(this).attr('data', pool._code);

                formattedData = Utils.formatPoolData(pool);
				if (formattedData.rewardsTicketCount) {
					$('#spin-btn').css('visibility', 'visible');
				} else {
					$('#spin-btn').css('visibility', 'hidden');
				}
                $('#wheel-text .spins-count').text(formattedData.formatFreeSpins);
                $('#wheel-text .date').text(formattedData.formatExpirationDate);
				var skinName = pool._skinName;
				$('.arrow-container').empty().append(
					`<img id="click-to-spin-arrow" src="../saw-images-assets/${skinName}/${skinName}-arrow.png"></img>`
				)
				animations.clickToSpinArrow();
				$('.pointer-container').empty().append(
					`<img src="../saw-images-assets/${skinName}/${skinName}-tick.png"></img>`
				)
				$('#wheel-ring').empty().append(
					`<img src="../saw-images-assets/${skinName}/${skinName}-wheel.png"></img>`
				)
                $('#image').attr({
                    'src': `../saw-images-assets/${skinName}/${skinName}-bg.jpg`,
					'width': '100%',
					'height': $( window ).height(),
                }).css('position', 'absolute');

                legacySaWRender.onOpenPool(pool._code);
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
