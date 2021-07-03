function shopCommands() {
  if (dividedMessage[0] == "!sell") {
    var user = database.users[GetIndexFromUserID(msg.author.id)];
    var itemIndex = Math.floor(Number(dividedMessage[1])) - 1;
    var amount = Math.floor(Number(dividedMessage[2]));
    var itemUser = user.inventory[itemIndex];
    var itemShop = database.shop[itemIndex]
    var priceDeduced = itemShop.price * 0.9
    
    // if amount is not specified the DEFAULT is 1
    if(isNaN(amount)) {
      amount = 1;
    }

    if (amount < 0) {
      msg.channel.send("you cant sell negative items bestie");
      return;
    }
    
    if (isNaN(itemIndex)) {
      msg.channel.send("thats not a valid number");
      return;
    }

    cost = priceDeduced*amount;

    var itemToSubtract = {
      name : itemUser.name,
      count : amount
    }
    //Try to get index of item with same name in user's inventory
    var existingIndex = user.inventory.findIndex(function(item) { 
      return itemUser.name == itemToSubtract.name;
    });
    
    console.log(existingIndex)
    if (existingIndex == -1) {
      user.inventory.delete(inventory[existingIndex])
    }
    else {
      user.inventory[existingIndex].count -= itemToSubtract.count;
    }
    
    itemShop.stock += amount;
    user.wallet += cost;
    msg.channel.send("you sold " + amount + " " + itemShop.name + "(s)");
    
    SaveDataToJSON();
    return;
  }
  
  if (dividedMessage[0] == "!buy") {
    var itemIndex = Math.floor(Number(dividedMessage[1])) - 1;
    var item = database.shop[itemIndex];
    
    var amount = Math.floor(Number(dividedMessage[2]));
    if(isNaN(amount)) {
      amount = 1;
    }
    var user = database.users[GetIndexFromUserID(msg.author.id, true)];

    if(isNaN(itemIndex)) {
      msg.channel.send("thats not a valid number");
      return;
    }

    if(item == null) {
      msg.channel.send("i couldnt find an item with that name bestie");
      return;
    }

    var totalPrice = item.price * amount;

    if(user.wallet < totalPrice) {
      msg.channel.send("you don't have enough money in your wallet to buy " + amount + " " + item.name + " bestie westie!");
      return;
    }
    if(item.stock < amount) {
      msg.channel.send("sowwy! i dont have enough items in stock");
      return;
    }
    if (amount < 0) {
      msg.channel.send("you cant buy negative items bestie");
      return;
    }
    if (user.inventory.length == 0) { // If user doesn't have inventory, it will add one for them in database
      user.inventory = [];
    }

    var itemToAdd = {
      name: item.name,
      count: amount
    }
    
    //Try to get index of item with same name in user's inventory
    var existingIndex = user.inventory.findIndex(function(item) { 
      return item.name == itemToAdd.name;
    });

    if(existingIndex == -1) {
      user.inventory.push(itemToAdd);
      
    }
    else {
      user.inventory[existingIndex].count += itemToAdd.count;
    }

    item.stock -= amount;
    user.wallet -= totalPrice;
    msg.channel.send("you bought " + amount + " " + item.name + "(s)");
    
    SaveDataToJSON();
    return;
  }

  if (dividedMessage[0] == "!shop") {
    var shop = database.shop;
    var embed = new Discord.MessageEmbed();
    embed.setTitle("Shop");
    
    var shopMenu = [];
    for (i in shop) {
      var index = Number(i) + 1;
      var itemValues = {
        name : "[" + index + "] " + shop[i].name,
        price : shop[i].price,
        desc : shop[i].description
        }
        shopMenu.push(itemValues)
      }

    embed.addField("Name", shopMenu.map(({ name }) => name + "\n"), true)
    embed.addField("Price", shopMenu.map(({ price }) => price + "\n"), true)
    embed.addField("Description", shopMenu.map(({ desc }) => desc + "\n"), true)  
    msg.channel.send(embed);
    return;
  }
  
  if (["!bag", "!inv", "!inventory"].includes(message)) {
    var user = database.users[GetIndexFromUserID(msg.author.id)];
    if(!user.inventory) {
      user.inventory = [];
    }
    var inventory = user.inventory;
    
    var embed = new Discord.MessageEmbed();

    for(item in inventory) {
      var index = Number(item) + 1;
      name = "[" + index + "] " + inventory[item].name;
      count = inventory[item].count;
      embed.addField(name, count);
    }
    embed.setTitle(user.name + "'s Inventory");
    if(inventory.length == 0) {
      embed.setDescription("Your inventory is empty!");
    }
    msg.channel.send(embed);

    SaveDataToJSON();
    return;
  }
}