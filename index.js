const express = require('express');
require('dotenv').config({path : "C:\\Users\\vinhp\\OneDrive\\Desktop\\Coding Projects\\AnsonBot\\private\\token.env"});
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Bot Online!'));
app.listen(port, () => print('App listening at http://localhost:${port}'));
const Discord = require("discord.js");
const client = new Discord.Client();


///IMPORTANT SETTINGS ////////////////
const version = "experimental"; //master or experimental
const logAllMessages = true;
const messagesPerLog = 1;

const pre = "~"

//////////////////////////////////////


if(version == "master") {
  client.login(process.env['DISCORD_TOKEN']);
}
if(version == "experimental") {
  client.login(process.env.DISCORD_TOKEN);
}


var fs = require('fs');
var database;
var log = "";
var logCounter = 0;
ReadJSONData();


///////// SHITTY AWFUL HORRIBLE WAY TO IMPORT FILES BUT REPL HAS FORCED MY HAND ////////////
var filesToImport = ["generalCmds.js", "shop.js", "gambling.js", "economy.js", "stock_market.js", "playAudio.js"];

for(var i = 0; i < filesToImport.length; i++) {
  var file = filesToImport[i];
  console.log(file);
  var script = fs.readFileSync("./" + file).toString();
  eval(script);
}


var adminIDs = ["473191715411329035", "351574671109521410"];
var ansonID = "236727649114914817";


// Declare all message event variables globally first so sub-functions can access them
var msg;
var rawMessage;
var message;
var dividedMessage;


client.on("ready", function() {
  print("Ready!");
  client.user.setStatus('online');
  client.user.setActivity(`with E-Girls q(≧▽≦q) ${pre}help`);
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
    print(logMessage, false, true);
  }

  try {
    if (message == `${pre}error`) {
      user.add(penis.cock);
    }

    if (message == `${pre}version`) {
      msg.channel.send(version);
    }

    /////////////// SPECIAL ADMIN COMMANDS ////////////////////////
    if (message == `${pre}resetcd`) {
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
    if (message.substring(0, 10) == `${pre}setcoins `) {
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
    
    AudioCommands();
    generalCmds();
    economyCommands();
    shopCommands();
    gambleCommands();
    StockCommands();

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

function print(message, logToConsole = true, logToFile = false, type) {
  if (logToFile) {
    var d = new Date();
    var hours = ("0" + d.getHours()).slice(-2);
    var minutes = ("0" + d.getMinutes()).slice(-2);
    var seconds = ("0" + d.getSeconds()).slice(-2);
    var logDate = "[" + hours + ":" + minutes + ":" + seconds + "]: ";
    log += logDate;
  }

  if (type == "error") {
    if(logToConsole) console.error(message);
    if (logToFile) {
      log += "Error: " + message + "\n";
      logCounter++;
    }
  }
  else {
    if(logToConsole) console.log(message);
    if (logToFile) {
      log += message + "\n";
      logCounter++;
    }
  }
  if (logToFile && logCounter > messagesPerLog - 1) {
    fs.appendFileSync("log.txt", log);
    log = "";
    logCounter = 0;
  }
}

function OnError(error, message) {
  message.channel.send("Oh no! looks like you made a fucky wucky!");
  print("An error occured due to the message: \"" + message.content + "\"");
  print(error, true, true, "error");
}

