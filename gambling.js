function gambleCommands() {
  if ([`${pre}cf`, `${pre}coinflip`].includes(DivideByWhitespace(message)[0])) {
    var user = database.users[GetIndexFromUserID(msg.author.id, true, msg)];
    var heads = GetRandomInt(0, 1);

    var embed = new Discord.MessageEmbed();
    embed.setTitle("Coinflip");
    embed.setColor(0xffffff * heads); //White if heads, black if tails

    if (DivideByWhitespace(message)[1]) { //If a second argument is specified
      var amount = DivideByWhitespace(message)[1];
      
      if(isNaN(amount)) { //If amount is not a number
        if(amount == "all") {            
          amount = user.wallet;
          if (amount > 0) {
            if (heads) {
              user.wallet += amount;
              embed.addField("The coin landed on Heads!", "You gained " + amount + " coins! Your balance is now " + user.wallet, true);
            }
            else {
              user.wallet -= amount;
              embed.addField("The coin landed on Tails!", "You lost " + amount + " coins! Your balance is now " + user.wallet, true);
            }
              SetCooldown(msg.author.id, "slots", 0.15);
            }
          else {
            msg.channel.send("you cant bet a negative number silly baka");
            return;
          }
        }
        else {
          msg.channel.send("Thats not a valid amount uwu");
          return;
        }
      }
      else {
        amount = Math.floor(Number(amount));
        if(amount > 0) {
          if (user.wallet >= amount) {
            if (heads) {
              user.wallet += amount;
              embed.addField("The coin landed on Heads!", "You gained " + amount + " coins! Your balance is now " + user.wallet, true);
            }
            else {
              user.wallet -= amount;
              embed.addField("The coin landed on Tails!", "You lost " + amount + " coins! Your balance is now " + user.wallet, true);
            }
            SetCooldown(msg.author.id, "slots", 0.15);
          }
          else {
            msg.channel.send("You're too broke to bet that much!");
            return;
          }
        }
        else {
          msg.channel.send("Thats not a valid number, silly!")
          return;
        }
      }
    }
    else {
      if (heads) {
        embed.setDescription("The coin landed on Heads!");
      }
      else {
        embed.setDescription("The coin landed on Tails!");
      }
    }
    msg.channel.send(embed);

    SaveDataToJSON();
    return;
  }

  if (dividedMessage[0] == `${pre}slots`) {
    var payoutFactor = 7; //FACTOR OF HOW MUCH MONEY YOU GET BACK FOR A WIN

    var amount = message.slice(7);
    var index = GetIndexFromUserID(msg.author.id, true, msg);
    var user = database.users[index];
    var embed = new Discord.MessageEmbed();

    if (amount == "all") {
      amount = user.wallet;
      if (amount <= 0) {
        msg.channel.send("oh no! too bad bestie! looks like u have no monies :confounded:!");
        return;
      }
    }
    else if (!isNaN(amount)) {
      amount = Math.floor(amount);
      if (amount > user.wallet) {
        msg.channel.send("UWU you don't have any money");
        return;
      }
      if (amount <= 0) {
        msg.channel.send("bestie! you cant gamble nothing!");
        return;
      }
    }
    else {
      msg.channel.send("UWU you didn't enter a valid amount");
      return;
    }
    var final = [];
    var emoji = [":japanese_goblin:", ":poop:", ":heart:"];
    for (let i = 0; i < 3; i++) {
      a = emoji[GetRandomInt(0, emoji.length - 1)];
      final.push(a);
    }

    embed.setTitle("Slot Machine");
    embed.addField("Results", String(final), true);

    if (final[0] == final[1] && final[1] == final[2] && final[0] == final[2]) {
      user.wallet += payoutFactor * amount;
      embed.addField("You won!", "Your balance is now: " + user.wallet, false)
    }
    else {
      user.wallet -= amount;
      embed.addField("You lost!", "Your balance is now: " + user.wallet, false)
    }

    msg.channel.send(embed);
    SaveDataToJSON();
    return;
  }
}