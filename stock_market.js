var stocks = database.stocks;

var maxDeltaChange = 1; //Maximum amount the delta can change each update


function StockCommands() {
    if(dividedMessage[0] == `${pre}stocks`) {
        if(dividedMessage.length == 1) { //if only asking for stocks
            var embed = new Discord.MessageEmbed();
            var stockObjects = Object.values(stocks); //Get array of all objects within stocks
            embed.setTitle("Stock Prices");
            embed.addFields(
                { name: "Wallet Balance", value: user.wallet, inline: true },
                { name: "Bank Balance", value: user.bank, inline: true }
            );
            embed.setColor(0x38c96e);
            msg.channel.send(embed);
        }
    }
}


function UpdateStocks() {
    var stockObjects = Object.values(stocks);

    for(var i = 0; i < stockObjects.length; i++) {
        var stock = stockObjects[i];

        stock.value += stock.delta; //Delta = the change to the value every update

        stock.delta += (Math.random() - 0.5) * maxDeltaChange * 2;

        print(stock.value);
        print(stock.delta);
    }
}