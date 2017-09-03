function SaWTest(url) {

    var randomRewardTicketsResponse;
    var transactionCodes = {};
    var increment = 0;

    var test = new Test(url, document.body, 90, 100, 0, 100);
    test.initPostMessage(this);

    this.onMessage = function (message) {
        switch (message.classId) {
            case 60240:
                this.sendShowPool(22222);
                this.sendPools("src/html/saw/eclient/proto/rr_pools_new.json");
                break;
            case 60242:
                this.sendTickets("src/html/saw/eclient/proto/rr_tickets_new.json");
                break;
            case 60245:
                $.getJSON("src/html/saw/eclient/proto/rr_pools_new.json", function (data) {
                    var prizeCode;
                    for (var i = 0; i < data.pools.length; i++) {
                        var pool = data.pools[i];
                        if (pool.code === message.templateCode) {
                            prizeCode = pool.rewards[0].code;
                        }
                    }
                    increment++;
                    transactionCodes[increment] = message.templateCode;
                    test.sendMessage({ classId: 60246, requestId: message.requestId, prizeCode: prizeCode, transactionCode: increment });
                }.bind(this));
                break;
            case 60247:
                var templateCode = transactionCodes[message.transactionCode];
                if (templateCode) {
                    transactionCodes[message.transactionCode] = null;
                    randomRewardTicketsResponse.totalTickets = randomRewardTicketsResponse.totalTickets - 1;
                    for (var i = 0; i < randomRewardTicketsResponse.tickets.length; i++) {
                        var ticket = randomRewardTicketsResponse.tickets[i];
                        if (ticket.templateCode === templateCode) {
                            ticket.totalCount = ticket.totalCount - 1;
                        }
                    }
                    test.sendMessage(randomRewardTicketsResponse);
                }
                break;
        }
    }

    this.sendPools = function (fileName) {
        test.sendJsonFile(fileName);
    }

    this.sendClearPools = function () {
        test.sendMessage({ classId: 60241, pools: [] });
    }

    this.sendTickets = function (fileName) {
        $.getJSON(fileName, function (data) {
            randomRewardTicketsResponse = data;
            test.sendMessage(data);
        }.bind(this));
    }

    this.sendClearTickets = function () {
        ticketsData = null;
        test.sendMessage({ classId: 60243, tickets: [], totalTickets: 0 });
    }

    this.sendShowPool = function (templateCode) {
        ticketsData = null;
        test.sendIntegrationMessage({ classId: 301, templateCode: templateCode }, "*");
    }

}
