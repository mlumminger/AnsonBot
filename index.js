const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Bot Online!'));
app.listen(port, () => print('App listening at http://localhost:${port}'));
const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env['DiscordToken']);

var fs = require('fs')
var database;
var log = "";
var logCounter = 0;
ReadJSONData();

var adminIDs = ["473191715411329035", "351574671109521410"];
var ansonID = "236727649114914817";


///IMPORTANT CHANGE FOR DIFFERENT BRANCHES ////////////////
var version = "experimental"; //master or experimental
////////////////////////////////////////////////////

client.on("ready", function() {
  print("Ready!");
  client.user.setStatus('online');
  client.user.setActivity("with E-Girls q(≧▽≦q) !help");
})



client.on('message', msg => {      ///MESSAGE HANDLER
  if (msg.author == client.user.id) return;
  var rawMessage = msg.content;
  var message = rawMessage.toLowerCase();

  try {
    if (message == "!error") {
      user.add(penis.cock);
    }

    if (message == "!version") {
      msg.channel.send(version);
    }

    /////////////// SPECIAL ADMIN COMMANDS ////////////////////////
    if (message == "!resetcd") {
      if (!adminIDs.includes(msg.author.id)) { //Only let admins use this command
        msg.channel.send("Sorry bestie, you dont have permission to do that :disappointed_relieved:");
        return;
      }
      for (var i = 0; i < database.users.length; i++) {
        user = database.users[i];
        user.cooldowns = {};
      }
      msg.channel.send("All cooldowns have been reset!");
      print("An admin reset all cooldowns");
      SaveDataToJSON();
      return;
    }

    if (message.substring(0, 10) == "!addcoins ") {
      if (!adminIDs.includes(msg.author.id)) { //Only let admins use this command
        msg.channel.send("Sorry bestie, you dont have permission to do that :disappointed_relieved:");
        return;
      }
      var substrings = DivideByWhitespace(message);
      var targetIndex = GetIndexFromPingOrName(substrings[1]);
      var amount = Math.floor(Number(substrings[2]));

      if (isNaN(amount)) {
        msg.channel.send("That amount is not valid");
        return;
      }
      else if (targetIndex < 0) {
        msg.channel.send("Target not found");
        return;
      }

      var target = database.users[targetIndex];
      target.wallet += amount;
      if (amount >= 0) {
        msg.channel.send("Added " + amount + " coins to " + target.name + "'s wallet");
        print("An admin added " + amount + " coins to " + target.name + "'s wallet");
      }
      else {
        msg.channel.send("Subtracted " + Math.abs(amount) + " coins froms " + target.name + "'swallet");
        print("An admin removed " + Math.abs(amount) + " coins from " + target.name);
      }
      SaveDataToJSON();
      return;
    }
    if (message.substring(0, 10) == "!setcoins ") {
      if (!adminIDs.includes(msg.author.id)) { //Only let admins use this command
        msg.channel.send("Sorry bestie, you dont have permission to do that :disappointed_relieved:");
        return;
      }
      var substrings = DivideByWhitespace(message);
      var targetIndex = GetIndexFromPingOrName(substrings[1]);
      var amount = Math.floor(Number(substrings[2]));

      if (isNaN(amount)) {
        msg.channel.send("That amount is not valid");
        return;
      }

      if (targetIndex > -1) {
        var target = database.users[targetIndex];
        target.wallet = amount;
        print("An admin set " + target.name + "'s balance to " + amount);
        msg.channel.send("Set " + target.name + "'s coins to " + amount);
        SaveDataToJSON();
        return;
      }
      else {
        return;
      }
    }
    
    //-------------- GENERAL STUFF-----------------////

    if ((msg.author.id == 351574671109521410 && version == "experimental") || (msg.author.id == ansonID && version == "master")) {
      var chance = GetRandomInt(0, 100); //Change for something to happen
      
      if(chance < 5) {
        var selectionChance = GetRandomInt(0, 100); //Chance for different things
        var quotes = [
            "you're the imposter",
            "i was born from your saliva :)",
            "stop being such a sussy baka",
            "uwu get out of this server bestie westie. you dont belong here",
            "im better than you and you're not.",
            "hey bestie! i think you should leave the esports team so i can replace you",
            "!rob <@" + msg.author.id + ">",
            "hey bestie! i found a pic of us! https://cdn.discordapp.com/attachments/525177389396000788/858982174979915814/image0.jpg"
        ] 
        if (selectionChance >= 50) {
          msg.reply(quotes[GetRandomInt(0, quotes.length-1)]);
        }
        else if (selectionChance < 50) {
          if(version == "master") msg.react("<:AmongUs:856421087419432980>");
          if(version == "experimental") msg.react("<:dappernick:859225132119883777>")
        }
      }
    }

    //Just do "lets have a child" no ones gonna say that without the birth off anyway lol
    // unless an ecouple is planning their future
    
    if(message.includes("lets have a child")) {
      var name = message.guild.member(message.author).displayName;
      if(!name) name = message.author.username;
      msg.channel.send(name + ": I have been ordered to issue an apology by the court of law, in no instance should child birth be linked to illegal gambling, and if there's one thing that makes childbirth a drag... It's illegal gambling. Please forgive me and don't set up a child birth-off of your own.");
      return;
    }
    
    if(["rhodesian", "rhodesia"].includes(message)) {
      var messages = [
        "Stay away from politics bestie! :heart:",
        "Rhodesia? that dissolved 40 years ago. Get with the times!!"
      ]
      msg.channel.send(messages[GetRandomInt(0, messages.length - 1)]);
      return;
    }
    
    if(["cat ", "kitty", "nya", "nidalee", "kat", "nid", "rengar"].includes(message)) {
      msg.channel.send("nya~");
      return;
    }

    if(["angey", "angy"].includes(message)) {
      var messages = [
        ">:c",
        ">:C"
      ]
      if(version == "master") messages.push("<:angey:856240888794316800>");
      msg.channel.send(messages[GetRandomInt(0, messages.length - 1)]);
      return;
    }
    
    if(message.includes("What are you doing?")) {
      var name = message.guild.member(message.author).displayName;
      if(!name) name = message.author.username;
      msg.channel.send("Step " + name);
      return;
    }
    
    

    if (message.includes("!femboyanson")) {
      var images = [
        'https://cdn.discordapp.com/attachments/525177389396000788/858982174979915814/image0.jpg',
        'https://cdn.discordapp.com/attachments/525177389396000788/858982175281250314/image1.jpg',
        'https://cdn.discordapp.com/attachments/525177389396000788/858982175604998154/image2.jpg',
        'https://cdn.discordapp.com/attachments/525177389396000788/858982176255377408/image3.png',
        'https://cdn.discordapp.com/attachments/525177389396000788/858982176720814100/image4.jpg',
        'https://cdn.discordapp.com/attachments/525177389396000788/858982177027260426/image5.jpg',
        'https://cdn.discordapp.com/attachments/525177389396000788/858982177278001152/image6.jpg'
      ]
      msg.channel.send(images[GetRandomInt(0, images.length - 1)])
      return;
    }

    if (message.includes(" rights")) {
      var rightsString = message.split(" rights")[0];
      msg.channel.send(rightsString + " rights!");
      return;
    }

    if (message.substring(0, 5) == "!name") {
      var name = rawMessage.slice(6);
      if (name.includes(" ")) {
        msg.channel.send("As of right now, there is an issue with using spaces in your nickname, please avoid using spaces for now");
        return;
      }
      var index = GetIndexFromUserID(msg.author.id, true);
      if (name.length == 0) {
        var currentName = database.users[index].name;
        if (currentName != null) {
          msg.reply(" your nickname is " + currentName)
        }
        else {
          msg.reply(" you haven't set a nickname yet");
        }
      }
      else {
        database.users[index].name = name;
        msg.reply(" changed their name to " + name);
        print("User ID " + msg.author.id + " changed their name to " + name);
        SaveDataToJSON();
      }
      return;
    }

    if (message == "!help") {
      var substrings = DivideByWhitespace(message);
      var request = substrings[1];
      var embed = new Discord.MessageEmbed();

      embed.setTitle("Help Menu");
      embed.addFields(
        { name: "!name", value: "Changes your nickname", inline: true },
        { name: "!beg", value: "Begs Anson for money", inline: true },
        { name: "!deposit", value: "Deposits your wallet balance to the bank (!deposit ###)", inline: true },
        { name: "!withdraw", value: "Wtihdraw money from your bank to your wallet (!withdraw ###)", inline: true },
        { name: "!rob", value: "Robs the person you ping (!rob @example)", inline: true },
        { name: "!esports", value: "Information on E-Sports", inline: true },
        { name: "!8ball", value: "It'll answer your question! (!8ball question)", inline: true },
        { name: "!slots", value: "Gamble your wallet money! x10 the return", inline: true },
        { name: "!give or !send", value: "Send Money to your Friends! !send @example ##)", inline: true },
        { name: "!day", value: "GAME WEEK DAY!", inline: true },
        { name: "!bal", value: "Gives Information on your Wallet and Bank balance", inline: true },
        { name: "!leaderboard or !lb", value: "Gives Information on the Top Sugar Daddies", inline: true },
        { name: "!coinflip", value: "50/50 Chance of winning money", inline: true }
      );
      embed.setColor(0x38c96e);
      msg.channel.send(embed);
      return;
    }

    if (message == "!clear") {
      msg.channel.messages.fetch({ limit: 100 }).then(recentMessages => {
        print("Clearing recent messages");
        recentMessages.forEach(function(m) {
          if (m.author.id == client.user.id || m.content.substring(0, 1) == "!") {
            m.delete();
          }
        });
      });
    }

    if (message == "!esports") {
      var url = 'https://forms.gle/fSAvWdFdp4Ncg8rS7';
      var quotes = [
        "Hey, do you love league of legends, then you'll love league of legends live \n  ",
        "So true bestie! Come join: \n ",
        "E-Sports is for everyone! Come join: \n ",
        "League of Legends, Smash Bros, Rocket League, Madden, and Splatoon E-Sports: \n ",
        "You'll be Challenger within a month!: \n  ",
        "@gyaraados#6969 will give you a sucky: \n ",
        "nya~ \n ",
        "You can join bestie :heart: \n "
      ];

      response = quotes[GetRandomInt(0, quotes.length - 1)] + url;
      msg.channel.send(response);
      return;
    }


    if (message == "!day") {
      var date = new Date();
      switch (date.getDay()) {
        case 0:
          msg.channel.send("ඞ ITS SUSSY SUNDAY!! ඞ")
          break;
        case 1:
          msg.channel.send("IT IS MINECRAFT MONDAY")
          break;
        case 2:
          msg.channel.send("TERRARIA TUESDAY")
          break;
        case 3:
          msg.channel.send("Whatever Wednesday :neutral_face:")
          break;
        case 4:
          msg.channel.send("The fuck Thursday")
          break;
        case 5:
          msg.channel.send("ITS FORTNITE FRIDAY!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          break;
        case 6:
          msg.channel.send("Today is Shooter Saturday :gun: :gun: ")
          break;
      }
      return;
    }

    if (message.substring(0, 6) == "!8ball") {
      var question = message.slice(6);
      var answers = [
        "of course bestie!",
        "for sure bestie!",
        "definitely bestie :heart:",
        "yes :smiling_face_with_3_hearts:",
        "100% bestie westie :smiling_face_with_3_hearts:",
        "yes little kitten :heart:",
        "probably uwu",
        "it's looking good bestie!",
        "yes uwu",
        "uwu nuzzle wuzzle yes!",
        "bestie try again :c",
        "i'm busy kitten ask again later...",
        "sorry, kitten can't tell you now :c",
        "Maybe ;)",
        "bestie westie, try harder!",
        "uh-oh bestie it might not be good",
        "oopsie woopsie! sowwy..",
        "sowwyy try again next time ;)",
        "its okay bestie, but its a no",
        "idk bestieee"
      ]

      msg.channel.send("Q: " + question + "\nA: " + answers[GetRandomInt(0, answers.length - 1)]);
      return;
    }

    //-------------- ECONOMY STUFF-----------------////
    if (message == "!beg") {
      var index = GetIndexFromUserID(msg.author.id, true, msg);
      var user = database.users[index];
      var num = GetRandomInt(0, 100);
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
        SetCooldown(msg.author.id, "beg", 0.25);
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
          msg.channel.send("you transfered " + amount + " coins to your wallet! <:Felix_Cheer:859541940722204683>"); // CHANGE ID FOR EMOTE OR ADD FUNCTION TO GET ID 
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
          msg.channel.send("you transfered " + amount + " coins to your bank! <:Felix_Cheer:859541940722204683>"); // CHANGE ID FOR EMOTE OR ADD FUNCTION TO GET ID 
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
      var substrings = DivideByWhitespace(message);
      var targetIndex = GetIndexFromPingOrName(substrings[1]);
      var amount = Math.floor(Number(substrings[2]));

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
        msg.channel.send("You dont have enough money to give them that much");
        return;
      }
      if (amount < 0) {
        msg.channel.send("uwU you have send negative money!!");
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

    // --------------- Gambling --------------------- //
    if (["!cf", "!coinflip"].includes(DivideByWhitespace(message)[0])) {
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
            if (heads) {
              user.wallet += amount;
              embed.addField("The coin landed on Heads!", "You gained " + amount + " coins! Your balance is now " + user.wallet, true);
            }
            else {
              user.wallet -= amount;
              embed.addField("The coin landed on Tails!", "You lost " + amount + " coins! Your balance is now " + user.wallet, true);
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

    if (message.substring(0, 7) == "!slots ") {
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
  catch (err) {
    OnError(err, msg);
  }
});



// --------------- Functions --------------------- //

function CreateNewUser(id, name) {
  if (!name) {
    name = GetDiscordUserFromID(id).username;
  }
  database.users.push({ id: id, wallet: 0, bank: 0, name: name, cooldowns: {} })
  SaveDataToJSON();
}

function GetDiscordUserFromID(id) {
  return client.users.cache.find(user => user.id === id);
}

function GetIndexFromUserID(id, createNew, message) { // Get index in database based on user's ID
  var index = database.users.findIndex(function(obj) {
    return obj.id == id;
  })
  if (index < 0 && createNew) {
    if (message) {
      var name = message.guild.member(message.author).displayName;
      CreateNewUser(id, name);
    }
    else {
      CreateNewUser(id);
    }
    index = database.users.length - 1;
  }
  return index;
}

function GetIndexFromUsername(name) { // Get index in database based on user's ID
  var index = database.users.findIndex(function(obj) {
    return obj.name.toLowerCase() == name.toLowerCase();
  })

  return index;
}


function GetIndexFromPingOrName(target) {
  var index;
  var possibleID = GetIDFromPing(target);
  if (Number(possibleID) && possibleID > 0) {
    index = GetIndexFromUserID(possibleID, false);
  }
  else if (GetIndexFromUsername(target) > -1) {
    index = GetIndexFromUsername(target);
  }
  return index;
}

function GetIDFromPing(pingText) {
  return pingText.slice(3).slice(0, -1)
}

function SaveDataToJSON() {
  fs.writeFileSync("database.json", JSON.stringify(database, null, "\t"));
}

function ReadJSONData() {
  var rawdata = fs.readFileSync('database.json', 'utf8');
  database = JSON.parse(rawdata);
}

function GetRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function SetCooldown(userID, name, duration) {
  var time = Date.now() + duration * 60000; //Time in minutes
  var index = GetIndexFromUserID(userID, false);
  if (index > -1) {
    database.users[index].cooldowns[name] = time;
  }
}

function GetDateDifference(date1, date2) {
  var msDiff = Math.abs(date1 - date2);
  var diff = {
    hours: Math.floor(msDiff / 3600000) % 24,
    mins: Math.floor(msDiff / 60000) % 60,
    seconds: Math.floor(msDiff / 1000) % 60
  }
  return diff;
}

function DivideByWhitespace(string) {
  return string.split(" ").filter(function(i) { return i });
}

function print(message, type, logMessage = true) {
  if (logMessage) {
    var d = new Date();
    var hours = ("0" + d.getHours()).slice(-2);
    var minutes = ("0" + d.getMinutes()).slice(-2);
    var seconds = ("0" + d.getSeconds()).slice(-2);
    var logDate = "[" + hours + ":" + minutes + ":" + seconds + "]: ";
    log += logDate;
  }

  if (type == "error") {
    console.error(message);
    if (logMessage) {
      log += "Error: " + message + "\n";
      logCounter++;
    }
  }
  else {
    console.log(message);
    if (logMessage) {
      log += message + "\n";
      logCounter++;
    }
  }
  if (logMessage && logCounter > 0) {
    fs.appendFileSync("log.txt", log);
    log = "";
    logCounter = 0;
  }
}

function OnError(error, message) {
  message.channel.send("Oh no! looks like i ran into a little bit of a problem!");
  print("An error occured due to the message: \"" + message.content + "\"");
  print(error, "error");
}