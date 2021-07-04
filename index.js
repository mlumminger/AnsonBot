const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Bot Online!'));
app.listen(port, () => print('App listening at http://localhost:${port}'));
const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env(Discord_Token))

var fs = require('fs');
var database;
var log = "";
var logCounter = 0;
ReadJSONData();



///////// SHITTY AWFUL HORRIBLE WAY TO IMPORT FILES BUT REPL HAS FORCED MY HAND ////////////
var filesToImport = ["shop.js", "gambling.js", "economy.js"];

for(var i = 0; i < filesToImport.length; i++) {
  var file = filesToImport[i];
  console.log(file);
  var script = fs.readFileSync("./" + file).toString();
  eval(script);
}


var adminIDs = ["473191715411329035", "351574671109521410"];
var ansonID = "236727649114914817";


///IMPORTANT SETTINGS ////////////////
const version = "experimental"; //master or experimental
const logAllMessages = true;
const messagesPerLog = 1;

//////////////////////////////////////

// Declare all message event variables globally first so sub-functions can access them
var msg;
var rawMessage;
var message;
var dividedMessage;


client.on("ready", function() {
  print("Ready!");
  client.user.setStatus('online');
  client.user.setActivity("with E-Girls q(≧▽≦q) !help");
})


client.on('message', m => {      ///MESSAGE HANDLER
  msg = m;
  rawMessage = msg.content;
  message = rawMessage.toLowerCase();
  dividedMessage = DivideByWhitespace(message);

  if (msg.author == client.user.id) return;

  if(logAllMessages) {
    var name = msg.guild.member(msg.author).displayName;
    var logMessage = "#" + msg.channel.name + " | " + name + ": " + rawMessage;
    print(logMessage, {logToConsole: false, logToFile: true});
  }

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
      var targetIndex = GetIndexFromPingOrName(dividedMessage[1]);
      var amount = Math.floor(Number(dividedMessage[2]));

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
      var targetIndex = GetIndexFromPingOrName(dividedMessage[1]);
      var amount = Math.floor(Number(dividedMessage[2]));

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
      var name = msg.guild.member(msg.author).displayName;
      if(!name || name == null) name = msg.author.username;
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
    
    if(message.includes("what are you doing?")) {
      var name = msg.guild.member(msg.author).displayName;
      if(!name || name == null) name = msg.author.username;
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
      var embed = new Discord.MessageEmbed();

      embed.setTitle("Help Menu");
      embed.addFields(
        //GENERAL  
        { name: "!name", value: "Changes your nickname / Bad", inline: true },
        { name: "!esports", value: "Information on E-Sports", inline: true },
        { name: "!8ball", value: "It'll answer your question! (!8ball question)", inline: true },
        { name: "!day", value: "GAME WEEK DAY!", inline: true },
        { name: "!femboyanson", value: "Anson Pics owo", inline: true },
        //GAMBLE
        { name: "!slots", value: "Gamble your wallet money! x10 the return", inline: true },
        { name: "!coinflip", value: "50/50 Chance of winning money", inline: true },
        //ECONOMY & SHOP
        { name: "!leaderboard or !lb", value: "Gives Information on the Top Sugar Daddies", inline: true },
        { name: "!rob", value: "Robs the person you ping (!rob @example)", inline: true },
        { name: "!shop", value: "Display the items that are available for sale", inline: true },
        { name: "!inventory or !inv", value: "See all the items you have in your inventory", inline: true },
        { name: "!deposit", value: "Deposits your wallet balance to the bank (!deposit ###)", inline: true },
        { name: "!withdraw", value: "Wtihdraw money from your bank to your wallet (!withdraw ###)", inline: true },
        { name: "!bal", value: "Gives Information on your Wallet and Bank balance", inline: true },
        { name: "!beg", value: "Begs Anson for money", inline: true },
        { name: "!give or !send", value: "Send Money to your Friends! !send @example ##)", inline: true },
        { name: "!buy", value: "!buy (index # of item in shop) + amount", inline: true },
        { name: "!sell", value: "!sell (index # of item in inv) + amount", inline: true },
        { name: "!daily", value: "Get your daily money!", inline: true },
        { name: "!weekly", value: "Get your weekly money!", inline: true }
        
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

    economyCommands()
    shopCommands();
    gambleCommands()
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
    days : Math.floor(msDiff / 86400000) % 7,
    hours: Math.floor(msDiff / 3600000) % 24,
    mins: Math.floor(msDiff / 60000) % 60,
    seconds: Math.floor(msDiff / 1000) % 60
  }
  return diff;
}

function DivideByWhitespace(string) {
  return string.split(" ").filter(function(i) { return i });
}

function print(message, settings = {logToConsole: true, logToFile: false}, type) {
  if (settings.logToFile) {
    var d = new Date();
    var hours = ("0" + d.getHours()).slice(-2);
    var minutes = ("0" + d.getMinutes()).slice(-2);
    var seconds = ("0" + d.getSeconds()).slice(-2);
    var logDate = "[" + hours + ":" + minutes + ":" + seconds + "]: ";
    log += logDate;
  }

  if (type == "error") {
    if(settings.logToConsole)console.error(message);
    if (settings.logToFile) {
      log += "Error: " + message + "\n";
      logCounter++;
    }
  }
  else {
    if(settings.logToConsole) console.log(message);
    if (settings.logToFile) {
      log += message + "\n";
      logCounter++;
    }
  }
  if (settings.logToFile && logCounter > messagesPerLog - 1) {
    fs.appendFileSync("log.txt", log);
    log = "";
    logCounter = 0;
  }
}

function OnError(error, message) {
  message.channel.send("Oh no! looks like i ran into a little bit of a problem!");
  print("An error occured due to the message: \"" + message.content + "\"");
  print(error, {logToConsole: true, logToFile: true}, "error");
}

