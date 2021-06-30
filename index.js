const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Bot Online!'));
app.listen(port, () => console.log('App listening at http://localhost:${port}'));
const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env['DiscordToken']);

var fs = require('fs')
var database;
ReadJSONData();
//Expiremntal stuff

client.on("ready", function() {
  console.log("Ready!");
  client.user.setStatus('online');
  client.user.setActivity("with E-Girls q(≧▽≦q) !help");
})

//-------------- GENERAL STUFF-----------------////

client.on('message', msg => {      ///MESSAGE HANDLER
  if (msg.author == client.user.id) return;
  var rawMessage = msg.content;
  var message = rawMessage.toLowerCase();

  if(message == "!version") {
    msg.channel.send("Experimental");
  }

  /////////////// SPECIAL ADMIN COMMANDS ////////////////////////
  if(msg.author.id == "473191715411329035" || msg.author.id == "351574671109521410") {
    if(message == "!resetcd") {
      for(var i = 0; i < database.users.length; i++) {
        user = database.users[i];
        user.cooldowns = {};
      }
      msg.channel.send("All cooldowns have been reset!");
      console.log("An admin reset all cooldowns");
      SaveDataToJSON();
      return;
    }

    if(message.substring(0, 10) == "!addcoins ") {
      var substrings = message.split(" ");
      var targetIndex = GetIndexFromPingOrName(substrings[1]);
      var amount = Number(substrings[2]);

      if(targetIndex > -1 && amount) {
        var target = database.users[targetIndex];
        target.wallet += amount;
        if(amount >= 0) {
          msg.channel.send("Added " + amount + " coins to " + target.name + "'s wallet");
          console.log("An admin added " + amount + " coins to " + target.name + "'s wallet");
        }
        else {
          msg.channel.send("Subtracted " + Math.abs(amount) + " coins froms " + target.name + "'s wallet");
          console.log("An admin removed " + Math.abs(amount) + " coins from " + target.name);
        }
        SaveDataToJSON();
        return;
      }
      else {
        return;
      }
    }
  }




  if (message.includes(" rights")) {
    var rightsString = message.split(" rights")[0];
    msg.channel.send(rightsString + " rights!");
    return;
  }

  if (message.substring(0, 5) == "!name") {
    var name = rawMessage.slice(6);
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
      console.log("User ID " + msg.author.id + " changed their name to " + name);
      SaveDataToJSON();
    }
    return;
  }
  
  if (message == "!help") {
    var substrings = message.split(" ");
    var request = substrings[1];
    var embed = new Discord.MessageEmbed();
    
    embed.setTitle("Help Menu");
    embed.addFields(
      { name: "!name", value: "Changes your nickname", inline: true},
      { name: "!beg", value: "Begs Anson for money", inline: true},
      { name: "!deposit", value: "Deposits your wallet balance to the bank (!deposit ###)", inline: true},
      { name: "!withdraw", value: "Wtihdraw money from your bank to your wallet (!withdraw ###)", inline: true},
      { name: "!rob", value: "Robs the person you ping (!rob @example)", inline: true},
      { name: "!esports", value: "Information on E-Sports", inline: true},
      { name: "!8ball", value: "It'll answer your question! (!8ball question)", inline: true},
      { name: "!slots", value: "Gamble your wallet money! x10 the return", inline: true},
      { name: "!give or !send", value: "Send Money to your Friends! !send @example ##)", inline: true},
      { name: "!day", value: "GAME WEEK DAY!", inline: true},
      { name: "!bal", value: "Gives Information on your Wallet and Bank balance", inline: true},
      { name: "!leaderboard or !lb", value: "Gives Information on the Top Sugar Daddies", inline: true},
      { name: "!coinflip", value: "50/50 Chance of winning money", inline: true}
    );
    embed.setColor(0x38c96e);
    msg.channel.send(embed);
    return;
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
        msg.channel.send("FORTNITE FRIDAY!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        break;
      case 6:
        msg.channel.send("Shooter Saturday :gun: :gun: ")
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

    if(user.cooldowns["beg"] > Date.now()) {
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
    if(message.split(" ").length > 1) {
      var targetIndex = GetIndexFromPingOrName(message.split(" ")[1]);
      if(targetIndex > -1) {
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
    embed.setTitle(user.name + "\'s balance:");
    embed.addFields(
      { name: "Wallet Balance", value: user.wallet, inline: true },
      { name: "Bank Balance", value: user.bank, inline: true }
    );
    embed.setColor(0x38c96e);
    msg.channel.send(embed);
    msg.channel.send("Wow! look at that money :smiling_face_with_3_hearts: So cool and quirky!");
    return;
  }

  if(message.substring(0, 10) == "!withdraw ") {
    var amount = Number(message.slice(10));
    var index = GetIndexFromUserID(msg.author.id, true, msg);
    var user = database.users[index];
    
    if(amount > 0) {
      if(user.bank >= amount) {
        user.wallet += amount;
        user.bank -= amount;
        msg.channel.send("you transfered " + amount + " coins to your wallet! :Felix_Cheer:");
      }
      else {
        msg.channel.send("oh no! too bad bestie! looks like you dont have enough money to withdraw! :confounded:");
        return
      }
    }
    else if(amount == 0) {
      msg.channel.send("you cant transfer 0 coins, stupid!");
      return
    }
    else if(amount < 0) {
      msg.channel.send("you cant transfer negative coins, baka~!");
      return
    }
    else if(!amount) {
      msg.channel.send("that isnt a valid number!")
      return
    }
    SaveDataToJSON();
    return;
  }


  if(message.substring(0, 9) == "!deposit ") {
    var amount = Number(message.slice(9));
    var index = GetIndexFromUserID(msg.author.id, true, msg);
    var user = database.users[index];

    if (amount) {
      if (amount > user.wallet) {
        msg.channel.send("UWU you don't have any money");
        return
      }
      if (amount < 0) {
        msg.channel.send("oh no! too bad bestie! looks like u have no monies :confounded:!");
        return
      }
    }
    else {
      msg.channel.send("UWU you didn't enter a valid amount");
      return
    }

    user.wallet += -1*amount;
    user.bank += amount;

    msg.channel.send("You deposited " + amount + " coins :heart: ");

    SaveDataToJSON();
    return;
  }

  if (message.includes("!give ") || message.includes("!send ")) {
    var substrings = message.split(" ");
    var targetID = GetIDFromPing(substrings[1]);
    var target = GetDiscordUserFromID(targetID);
    var amount = Number(substrings[2]);
    var negativeChance = GetRandomInt(0, 100);

    var targetIndex = GetIndexFromUserID(targetID);
    var senderIndex = GetIndexFromUserID(msg.author.id, true, msg);
    if(targetIndex < 0) {
      msg.channel.send("The user you are trying to send coins is not registered");
      return;
    }

    if (amount < 1) {
      msg.channel.send("Amount specified is invalid");
      return;
    }
    else {
      if (targetID > 0) {
        var targetUser = database.users[targetIndex];
        targetUser.wallet += amount;
        var sender = database.users[senderIndex];
        sender.wallet -= amount;
        msg.channel.send(sender.name + " gave " + amount + " coins to " + targetUser.name);
      }
    }
    SaveDataToJSON();
    return;
  }
  
  if (message.substring(0, 5) == "!rob ") {
    var thief = database.users[GetIndexFromUserID(msg.author.id, true, msg)];
    

    if(thief.cooldowns["rob"] > Date.now()) {
      var diff = GetDateDifference(thief.cooldowns["rob"], Date.now());
      msg.channel.send("Sowwy, your fingies hurt from your last robbery! You can rob again in " + diff.mins + " minutes and " + diff.seconds + " seconds.");
      return;
    }

    var target;
    
    if(message.split(" ").length > 1) {
      var targetIndex = GetIndexFromPingOrName(message.split(" ")[1]);
      if(targetIndex > -1) {
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

    var amount = GetRandomInt(0, target.wallet / 2);
    var negativeChance = GetRandomInt(0, 100);
    
    if (target.wallet < 100) {
      msg.channel.send("This person is super poor! It's not worth it");
      return;
    }
    else if (negativeChance > 25) {
      target.wallet -= amount;
      thief.wallet += amount;
      msg.channel.send("u stole their money like how i stole vinh’s virginity :drooling_face:! \n" + thief.name + " stole " + amount + " coins from " + target.name);
      SetCooldown(msg.author.id, "rob", 5);
    }
    else if (negativeChance > 15) {
      if (thief.wallet < amount) {
        target.wallet += amount;
        thief.bank -= amount;
        msg.channel.send("oh my gosh bestie! they stole ur money instead! what comes goes around just like the blades on a chainsaw huh :joy: :joy: :joy: :joy: :joy: :joy: :joy: :joy: :joy: :joy: \n" + target.name + " beat " + thief.name + " up and stole " + amount + " coins!");
      }
      else {
        target.wallet += amount;
        thief.wallet -= amount;
        msg.channel.send(target.name + " beat " + thief.name + " up and stole " + amount + " coins!");
      }
    }
    else {
      thief.wallet -= amount;
      msg.channel.send("oh no bestie! u made a big fucky wucky and the police caught u :tired_face: uh-oh you lose " + amount + " coins.");
    }
    SaveDataToJSON();
    return;
  }


  if (message.substring(0, 12) == "!leaderboard" || message.substring(0,3) == "!lb") {
    var users = database.users;
    var leader_board = []
    var size = users.length
    
    for(user in users){
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
    embed.addField("Names", leader_board.map(({ name }) => name), true)
    embed.addField("Total Money", leader_board.map(({ score }) => score), true)

    msg.channel.send(embed);
    return;
  }


  // --------------- Gambling --------------------- //
  // if(message.substring(0, 9) == "!coinflip") {
  //   if(message.split())
  // } 

  if(message.substring(0, 7) == "!slots ") {
    var payoutFactor = 7; //FACTOR OF HOW MUCH MONEY YOU GET BACK FOR A WIN

    var amount = message.slice(7);
    var index = GetIndexFromUserID(msg.author.id, true, msg);
    var user = database.users[index];
    var embed = new Discord.MessageEmbed();
    
    if(amount == "all") {
      amount = user.wallet;
      if (amount <= 0) {
        msg.channel.send("oh no! too bad bestie! looks like u have no monies :confounded:!");
        return;
      }
    }
    else if(Number(amount)) {
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
    var emoji = [":japanese_goblin:",":poop:",":heart:"];
    for (let i = 0; i < 3; i++) {
        a = emoji[GetRandomInt(0,emoji.length - 1)];
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
});



// --------------- Functions --------------------- //

function CreateNewUser(id, name) {
  if(!name) {
    name = GetDiscordUserFromID(id).username;
  }
  database.users.push({id: id, wallet: 0, bank: 0, name: name, cooldowns: {}})
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
    if(message) {
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
  if(Number(possibleID) && possibleID > 0) {
    index = GetIndexFromUserID(possibleID, false);
  }
  else if(GetIndexFromUsername(target) > -1) {
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
  return Math.round(Math.random() * (max - min)) + min;
}

function SetCooldown(userID, name, duration) {
  var time = Date.now() + duration * 60000; //Time in minutes
  var index = GetIndexFromUserID(userID, false);
  if(index > -1) {
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

function OnError(error, channel) {
  channel.send("Oh no! looks like i ran into a little bit of a problem!");
}