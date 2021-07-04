function generalCmds() {
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
  
      if (message.includes(`${pre}femboyanson`)) {
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
  
      if (dividedMessage[0] == `${pre}name`) {
        var name = rawMessage.slice(pre.length + 5);
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
  
      if (message == `${pre}help`) {
        var embed = new Discord.MessageEmbed();
  
        embed.setTitle("Help Menu");
        embed.addFields(
          //GENERAL  
          { name: `${pre}name`, value: "Changes your nickname / Bad", inline: true },
          { name: `${pre}esports`, value: "Information on E-Sports", inline: true },
          { name: `${pre}8ball`, value: `It'll answer your question! (${pre}8ball question)`, inline: true },
          { name: `${pre}day`, value: "GAME WEEK DAY!", inline: true },
          { name: `${pre}femboyanson`, value: "Anson Pics owo", inline: true },
          //GAMBLE
          { name: `${pre}slots`, value: "Gamble your wallet money! x10 the return", inline: true },
          { name: `${pre}coinflip`, value: "50/50 Chance of winning money", inline: true },
          //ECONOMY & SHOP
          { name: `${pre}leaderboard or ${pre}lb`, value: "Gives Information on the Top Sugar Daddies", inline: true },
          { name: `${pre}rob`, value: `Robs the person you ping (${pre}rob @example)`, inline: true },
          { name: `${pre}shop`, value: "Display the items that are available for sale", inline: true },
          { name: `${pre}inventory or ${pre}inv`, value: "See all the items you have in your inventory", inline: true },
          { name: `${pre}deposit`, value: `Deposits your wallet balance to the bank (${pre}deposit ###)`, inline: true },
          { name: `${pre}withdraw`, value: `Withdraw money from your bank to your wallet (${pre}withdraw ###)`, inline: true },
          { name: `${pre}bal`, value: "Gives Information on your Wallet and Bank balance", inline: true },
          { name: `${pre}beg`, value: "Begs Anson for money", inline: true },
          { name: `${pre}give or ${pre}send`, value: `Send Money to your Friends! ${pre}send @example ##)`, inline: true },
          { name: `${pre}buy`, value: `${pre}buy (index # of item in shop) + amount`, inline: true },
          { name: `${pre}sell`, value: `${pre}sell (index # of item in inv) + amount`, inline: true },
          { name: `${pre}daily`, value: "Get your daily money!", inline: true },
          { name: `${pre}weekly`, value: "Get your weekly money!", inline: true },
          //AUDIO
          {name: `${pre}sing`, value: "Anson sings for you!", inline:true},
          {name: `${pre}leave`, value: "Kicks Anson out of the voice channel lol", inline:true}
          
        );
        embed.setColor(0x38c96e);
        msg.channel.send(embed);
        return;
      }
  
      if (message == `${pre}clear`) {
        msg.channel.messages.fetch({ limit: 100 }).then(recentMessages => {
          print("Clearing recent messages");
          recentMessages.forEach(function(m) {
            if (m.author.id == client.user.id || m.content.substring(0, 1) == "!") {
              m.delete();
            }
          });
        });
      }
  
      if (message == `${pre}esports`) {
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
  
  
      if (message == `${pre}day`) {
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
  
      if (dividedMessage[0] == `${pre}8ball`) {
        var question = message.slice(pre.length + 6);
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
}