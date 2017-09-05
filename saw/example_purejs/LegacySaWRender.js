function LegacySaWRender() {

    var logger = SawAPI.Logger.getLogger("LegacySaWRender");
    var network = new PostMessageNetwork.PostMessageNetwork();
    var sawAPI = new SawAPI.SawAPI(network);
    var eventBus = sawAPI.getApplicationContext().getEventBus();
    var randomRewardEngine = sawAPI.getApplicationContext().getEngines().getEngine(SawAPI.EngineType.RANDOM_REWARD_ENGINE);

    var legacySaWComponents = new LegacySaWComponents(this);
    var saWPoolGrid = legacySaWComponents.SaWPoolGrid();
    var saWSpinsDialog = legacySaWComponents.SaWSpinsDialog();
    var saWAnimationDialog = legacySaWComponents.SaWAnimationDialog(this);
    var saWPrizeDialog = legacySaWComponents.SaWPrizeDialog();
    this.onShow = function () {
        eventBus.addHandler(SawAPI.NativeClientReadyEvent.KEY, this);
        eventBus.addHandler(SawAPI.SpinAWheelPoolsEvent.KEY, this);
        eventBus.addHandler(SawAPI.SpinAWheelDrawEvent.KEY, this);
        network.connect();
    }

    this.onNativeClientReady = function () {
        logger.debug("On native client ready");
        randomRewardEngine.doRandomRewardPoolsRequest();
    }

    this.onSpinAWheelPools = function (totalTicketsCount, pools) {
        logger.debug("On spin a wheel pools: " + (pools ? pools.length : 0));
        saWPoolGrid.setPools(totalTicketsCount, pools);
    }

    this.onOpenPool = function (templateCode) {
        logger.info("Open pool info for: " + templateCode);
        saWSpinsDialog.setSectors(templateCode, randomRewardEngine.getSaWSectorPrizes(templateCode));
    }

    this.onStartSpin = function (templateCode) {
        logger.info("Start spin for pool: " + templateCode);
        randomRewardEngine.doDrawRandomRewardRequest(templateCode);
    }

    this.onSpinAWheelDraw = function (pool, prize) {
        logger.debug("On draw pool: " + pool._name);
        saWAnimationDialog.animate(pool, prize);
    }

    this.onSpinAnimationEnd = function (templateCode, prize) {
        logger.debug("On spin animation end for pool: " + templateCode);
        saWPrizeDialog.showPrize(prize);
        randomRewardEngine.doClaimRandomRewardRequest(templateCode);
    }

}