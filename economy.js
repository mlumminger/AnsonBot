function economyCommands() {
    if (message.substring(0, 6) == "!daily") {
      var index = GetIndexFromUserID(msg.author.id, true, msg);
      var user = database.users[index];
      var daily = GetRandomInt(300, 500);
      
      if (user.cooldowns["daily"] > Date.now()) {
        var diff = GetDateDifference(user.cooldowns["daily"], Date.now());
        msg.channel.send("Sowwy, but you cant do daily yet! Try asking again in " + diff.hours + " hours, " + diff.mins + " minutes, " + diff.seconds + " seconds!");
        return;
      }

      user.wallet += daily;
      msg.channel.send("yay! bestie you got `" + daily + "`. your balance is now `" + user.wallet + "`");
      SetCooldown(msg.author.id, "daily", 86400000);
      SaveDataToJSON();
      return;
    }

    if (message == "!weekly") {
      var index = GetIndexFromUserID(msg.author.id, true, msg);
      var user = database.users[index];
      var weekly = GetRandomInt(1000, 1500);

      if (user.cooldowns["weekly"] > Date.now()) {
        var diff = GetDateDifference(user.cooldowns["weekly"], Date.now());
        msg.channel.send("Sowwy, but you cant do weekly yet! Try asking again in " + diff.days + " days, " + diff.hours + " hours, " + diff.mins + " minutes, " + diff.seconds + " seconds!");
        return;
      }

      user.wallet += weekly;
      msg.channel.send("yay! bestie you got `" + weekly + "`. your balance is now `" + user.wallet + "`");
      SetCooldown(msg.author.id, "weekly", 60480000);
      SaveDataToJSON();
      return;
    }

    if (message == "!beg") {
      var index = GetIndexFromUserID(msg.author.id, true, msg);
      var user = database.users[index];
      var num = GetRandomInt(0, 300);
      var negativeChance = GetRandomInt(0, 100);

      if (user.cooldowns["beg"] > Date.now()) {
        var diff = GetDateDifference(user.cooldowns["beg"], Date.now());
        msg.channel.send("Sowwy, but you cant beg yet! Try begging again in " + diff.seconds + " seconds!");
        return;
      }

      var good_quotes = [
        "You're so poor lol Anson gave you ",
        "You poor bastard. Anson felt pity uwu...So he gave you ",
        "Since you're my kitten I'll give you ",
        "I'll give you money. But check out this application: https://forms.gle/Ma7LBMhMjyjSY77F6, You got ",
        "yay u win! now u can be my sugar daddy :) You won ",
        "u won bestie westie >w< You won ",
        "uwu nuzzle wuzzles u!! You won ",
        "Anson agrees with you. So true bestie so true! He gave you " // Gabe's Idea
      ]
      var bad_quotes = [
        "LOL You made Anson angey... he took your money. You lost ",
        "Anson gave you the Nino drink. You black out and lost ",
        "Anson leaked his nudes and you died from peeking at them. You lost ",
        "aww im sho sowwy u lost :pleading_face: You lost ",
        "its ok bestie youll win next time :smiling_face_with_3_hearts: You lost ",
        "im sowwy u cant get any money but u can get something else ;) Uh-oh bye bye "
      ]
      if (num == 0) {
        msg.channel.send("I cant give u money but i can give u a kiss mwah :kissing_closed_eyes:");
      }
      else {
        if (negativeChance < 80) {
          msg.channel.send(good_quotes[GetRandomInt(0, good_quotes.length - 1)] + num + " coins!");
          user.wallet += num;
        }
        else {
          msg.channel.send(bad_quotes[GetRandomInt(0, bad_quotes.length - 1)] + num + " coins!");
          if (num > user.wallet) {
            user.bank -= num;
          }
          else {
            user.wallet -= num;
          }
        }
        SetCooldown(msg.author.id, "beg", 0.05);
      }
      SaveDataToJSON();
      return;
    }

    if (message.substring(0, 4) == "!bal") {
      ReadJSONData();

      var user;
      if (DivideByWhitespace(message).length > 1) {
        var targetIndex = GetIndexFromPingOrName(DivideByWhitespace(message)[1]);
        if (targetIndex > -1) {
          user = database.users[targetIndex];
        }
        else {
          msg.channel.send("Could not find anyone with that name!");
          return;
        }
      }
      else {
        user = database.users[GetIndexFromUserID(msg.author.id, true, msg)];
      }

      var embed = new Discord.MessageEmbed();
      embed.setTitle(user.name + "\'s Balance:");
      embed.addFields(
        { name: "Wallet Balance", value: user.wallet, inline: true },
        { name: "Bank Balance", value: user.bank, inline: true }
      );
      embed.setColor(0x38c96e);
      msg.channel.send(embed);
      //msg.channel.send("Wow! look at that money :smiling_face_with_3_hearts: So cool and quirky!");
      return;
    }

    if (message.substring(0, 10) == "!withdraw ") {
      var amount = message.slice(10);
      var index = GetIndexFromUserID(msg.author.id, true, msg);
      var user = database.users[index];

      if (amount <= 0) {
        msg.channel.send("oh no! too bad bestie! looks like u have no monies :confounded:!");
        return;
      }
      if (isNaN(amount)) { //Check if amount is not a number, then check if amount is "all" or "none"
        if (amount == "all") {
          amount = user.bank;
        }
        else if (amount == "half") {
          amount = user.bank / 2;
        }
        else {
          msg.channel.send("That isn't a valid amount, dumby");
        }
      }

      amount = Math.floor(amount);

      if (amount > 0) {
        if (user.bank >= amount) { //If user has enough in bank
          user.wallet += amount;
          user.bank -= amount;
          if (version == "master") {
            msg.channel.send("you transfered " + amount + " coins to your wallet! <:Felix_Cheer:857108979423772743>"); // CHANGE ID FOR EMOTE OR ADD FUNCTION TO GET ID 
            return;
          }
          else {
            msg.channel.send("you transfered " + amount + " coins to your bank! <:Felix_Cheer:859541940722204683>"); // CHANGE ID FOR EMOTE OR ADD FUNCTION TO GET ID 
            return;
          }
        }
        else {
          msg.channel.send("oh no! too bad bestie! looks like you dont have enough money to withdraw! :confounded:");
          return;
        }
      }

      // Checks if the amount is 0, less than 0
      else if (amount == 0) {
        msg.channel.send("you cant transfer 0 coins, stupid!");
        return;
      }
      else if (amount < 0) {
        msg.channel.send("you cant transfer negative coins, baka~!");
        return;
      }

      SaveDataToJSON();
      return;
    }


    if (message.substring(0, 9) == "!deposit ") {
      var amount = message.slice(9);
      var index = GetIndexFromUserID(msg.author.id, true, msg);
      var user = database.users[index];

      if (user.wallet <= 0) { //Return if user has no money
        msg.channel.send("oh no! too bad bestie! looks like u have no monies :confounded:!");
        return;
      }

      if (isNaN(amount)) { //Check if amount is not a number, then check if amount is "all" or "none"
        if (amount == "all") {
          amount = user.wallet;
        }
        else if (amount == "half") {
          amount = user.wallet / 2;
        }
        else {
          msg.channel.send("That isn't a valid amount, dumby");
        }
      }

      amount = Math.floor(amount);


      if (amount > 0) {
        if (user.wallet >= amount) { //If user has enough in bank
          user.bank += amount;
          user.wallet -= amount;
          if (version == "master") {
            msg.channel.send("you transfered " + amount + " coins to your bank! <:Felix_Cheer:857108979423772743> ");
            return;
          }
          else {
            msg.channel.send("you transfered " + amount + " coins to your bank! <:Felix_Cheer:859541940722204683>"); // CHANGE ID FOR EMOTE OR ADD FUNCTION TO GET ID 
            return;
          }
        }
        else {
          msg.channel.send("oh no! too bad bestie! looks like you dont have enough money to deposit! :confounded:");
          return;
        }
      }

      // Checks if the amount is 0, less than 0
      else if (amount == 0) {
        msg.channel.send("you cant transfer 0 coins, stupid!");
        return;
      }
      else if (amount < 0) {
        msg.channel.send("you cant transfer negative coins, baka!");
        return;
      }

      SaveDataToJSON();
      return;
    }


    if (message.includes("!give ") || message.includes("!send ")) {
      var targetIndex = GetIndexFromPingOrName(dividedMessage[1]);
      var amount = Math.floor(Number(dividedMessage[2]));

      if (isNaN(amount)) {
        msg.channel.send("UWU you didn't enter a valid amount")
        return;
      }

      var senderIndex = GetIndexFromUserID(msg.author.id, true, msg);
      var sender = database.users[senderIndex];
      var target = database.users[targetIndex];

      if (targetIndex < 0) {
        msg.channel.send("The user you are trying to send coins is not registered");
        return;
      }
      if (amount > sender.wallet) {
        msg.channel.send("you dont have enough money to give them " + amount + " coins");
        return;
      }
      if (amount < 0) {
        msg.channel.send("uwu you cant send negative money!!");
        return;
      }
      else {
        target.wallet += amount;
        sender.wallet -= amount;
        msg.channel.send(sender.name + " gave " + amount + " coins to " + target.name);
      }
      SaveDataToJSON();
      return;
    }

    if (message.substring(0, 5) == "!rob ") {
      var thief = database.users[GetIndexFromUserID(msg.author.id, true, msg)];

      if (thief.cooldowns["rob"] > Date.now()) {
        var diff = GetDateDifference(thief.cooldowns["rob"], Date.now());
        msg.channel.send("Sowwy, your fingies hurt from your last robbery! You can rob again in " + diff.mins + " minutes and " + diff.seconds + " seconds.");
        return;
      }

      var target;

      if (DivideByWhitespace(message).length > 1) {
        var targetIndex = GetIndexFromPingOrName(DivideByWhitespace(message)[1]);
        if (targetIndex > -1) {
          target = database.users[targetIndex];
          if (thief.name == target.name) {
            msg.channel.send("that's yourself baka");
            return;
          }
        }
        else {
          msg.channel.send("I couldnt find anyone to rob with that name!");
          return;
        }
      }

      var amount = GetRandomInt(target.wallet * 0.25, target.wallet * 0.75);
      var failChance = GetRandomInt(0, 100);
      var thiefAmount = GetRandomInt(thief.wallet * 0.25, thief.wallet + 1000);

      if (target.wallet < 100) {
        msg.channel.send("This person is super poor! It's not worth it");
        return;
      }

      // 75% Chance for the robbery to work
      else if (failChance > 25) {
        target.wallet -= amount;
        thief.wallet += amount;
        msg.channel.send("u stole their money like how i stole vinh’s virginity :drooling_face:! \n" + thief.name + " stole " + amount + " coins from " + target.name);
        SetCooldown(msg.author.id, "rob", 5);
      }
      // 10% Chance for victim to rob you back
      else if (failChance > 15) {
        target.wallet += thiefAmount;
        thief.wallet -= thiefAmount;
        msg.channel.send("oh my gosh bestie! they stole ur money instead! what comes goes around!! :joy: :joy: :joy: :joy: :joy: :joy: :joy: :joy: :joy: :joy: \n" + target.name + " beat " + thief.name + " up and stole " + thiefAmount + " coins!");
      }
      // Otherwise the police catches you and charges a fine
      else {
        thief.wallet -= thiefAmount;
        msg.channel.send("oh no bestie! u made a big fucky wucky and the police caught u :tired_face: uh-oh you lose " + thiefAmount + " coins.");
      }
      SaveDataToJSON();
      return;
    }
        if (["!leaderboard", "!lb"].includes(DivideByWhitespace(message)[0])) {
      var users = database.users;
      var leader_board = []
      var size = users.length

      for (user in users) {
        var leaderboardUser = {
          name: users[user].name,
          score: users[user].wallet + users[user].bank
        }
        leader_board.push(leaderboardUser)
      }

      leader_board.sort((user1, user2) => user2.score - user1.score)

      var embed = new Discord.MessageEmbed();
      embed.setTitle("Top " + size + " Sugar Daddies");
      embed.setDescription("Calculated Based On Wallet and Bank Balance");
      embed.addField("Names", leader_board.map(({ name }) => name), true);
      embed.addField("Total Money", leader_board.map(({ score }) => score), true);
      msg.channel.send(embed);
      return;
    }
}