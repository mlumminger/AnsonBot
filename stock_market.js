function StockCommands() {
    if(dividedMessage[0] == "$updatestocks") {
        msg.channel.send("Stocks updated");
        UpdateStocks();
        return;
    }

    if([`${pre}stocks`, `${pre}stock`].includes(dividedMessage[0])) {
        var user = database.users[GetIndexFromUserID(msg.author.id, true, msg)];

        if(dividedMessage.length == 1) { //List all stocks
            var stockObjects = Object.values(database.stocks); //Get array of all objects within stocks
            
            var embed = new Discord.MessageEmbed();
            embed.setTitle("Stock Prices");

            for(var i = 0; i < stockObjects.length; i++) {
                var stock = stockObjects[i];
                
                var changeSymbol; //Arrow emoji representing the change in value last update
                if(stock.delta < 0) {
                    if(stock.delta > -10) changeSymbol = ":arrow_down_small:";
                    else changeSymbol = ":arrow_double_down:";
                }
                else if(stock.delta > 0) {
                    if(stock.delta < 10) changeSymbol = ":arrow_up_small:";
                    else changeSymbol = ":arrow_double_up:";
                }
                else {
                    changeSymbol = "";
                }

                embed.addField("[" + stock.shorthand.toUpperCase() + "] " + stock.name, changeSymbol + " " + stock.value, false);
            }

            embed.setColor(0x38c96e);
            msg.channel.send(embed);
        }
        else { //If command has multiple parameters
            if(["view", "get", "graph", "see", "value",].includes(dividedMessage[1])) {
                //DISPLAY STOCK GRAPH AND NUMBERS
                return;
            }

            else if(["owned", "inv", "inventory"].includes(dividedMessage[1])) { //Display all stocks the user owns
                if(!user.stocks) {
                    user.stocks = {};
                }
                var userStocks = Object.values(user.stocks);
            
                var embed = new Discord.MessageEmbed();
                embed.setTitle(`${user.name}'s Stocks`);

                for(var i = 0; i < userStocks.length; i++) {
                    var stock = userStocks[i];

                    if(database.stocks[stock.shorthand] && stock.amount > 0) {
                        var totalValue = database.stocks[stock.shorthand].value * stock.amount;
                        embed.addField(stock.name, `Amount: ${stock.amount}\nTotal Value: ${totalValue}`, false);
                    }
                }

                if(embed.fields.length == 0) {
                    embed.setDescription("no stocks here lmao");
                }

                embed.setColor(0x38c96e);
                msg.channel.send(embed);

                return;
            }

            else if(["buy"].includes(dividedMessage[1])) { //BUY A CERTAIN AMOUNT OF STOCK
                var choice = dividedMessage[2]; //accronym of which stock to buy
                var stock = database.stocks[choice];
                var amount = Math.floor(dividedMessage[3]);

                if(!choice || !stock) {
                    msg.channel.send("i couldnt find a stock with that name");
                    return;
                }
                if(isNaN(amount) || amount < 1) {
                    msg.channel.send("invalid amount!");
                    return;
                }

                var price = amount * stock.value;
                if(price > user.bank) {
                    msg.channel.send("you dont have enough moneys in your bank to buy that many stock");
                    return;
                }
                
                user.bank -= price;
                
                if(!user.stocks) {
                    user.stocks = {};
                }
                var oldAmount = 0; //Amount the user already had
                if(user.stocks[choice]) {
                    oldAmount = user.stocks[choice].amount
                }

                user.stocks[choice] = { 
                    name: stock.name,
                    amount: oldAmount + amount, //Add amount to existing amount
                    shorthand: stock.shorthand
                };

                msg.channel.send("You bought " + amount + " stocks in " + stock.name + ", for a total of " + price + " coins!");

                SaveDataToJSON();
                return;
            }

            else if(dividedMessage[1] == "sell") { //SELL A CERTAIN AMOUNT OF STOCK
                var stockName = dividedMessage[2]; //accronym of which stock to buy
                var stock = database.stocks[stockName];
                var userStock = user.stocks[stockName];

                var amount = Math.floor(dividedMessage[3]);

                if(!stock) {
                    msg.channel.send("i couldnt find a stock with that name");
                    return;
                }
                if(isNaN(amount) || amount < 1) {
                    msg.channel.send("invalid amount!");
                    return;
                }
                if(!userStock || userStock.amount < amount) {
                    msg.channel.send(`you dont have that many stocks in ${stock.name}`);
                    return;
                }

                userStock.amount -= amount;

                var totalValue = amount * stock.value;
                user.bank += totalValue;

                msg.channel.send(`uwU you sold ${amount} stocks in ${stock.name}, getting a total of ${totalValue} coins!!`);

                SaveDataToJSON();
                return;
            }
        }
    }
}


function UpdateStocks() {
    var maxDeltaChange = 5; //Maximum amount the delta can change each update

    var keys = Object.keys(database.stocks);

    for(var i = 0; i < keys.length; i++) {
        var stock = database.stocks[keys[i]];

        stock.value += stock.delta; //Delta = the change to the value every update

        stock.delta += Math.floor((Math.random() - 0.5) * maxDeltaChange * 2);

        if(stock.value <= 1) {
            stock.delta *= -0.5;
            stock.value = 1;
        }
    }

    SaveDataToJSON();
}