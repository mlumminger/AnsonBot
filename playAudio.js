const ytdl = require('ytdl-core');

function AudioCommands() {
    var channel;

    if(version == "master") channel = client.channels.cache.get('741124788407369859');
    else channel = client.channels.cache.get('846222971668004878'); //trying cache.get instead of fetch

    channel = msg.guild.member(msg.author.id).voice.channel;

    if (["sing, anson", `${pre}sing`].includes(message)) {
        playAudio("./audio/uwu.mp3", channel.id);
    }

    if(["get out anson", `${pre}leave`, "stop singing"].includes(message)) { 
        channel.leave();
        return;
    }
}
  
function playAudio(path, channelID) {
    var channel = client.channels.cache.get(channelID);

    if(!channel) {
        print("Main voice channel not found", true, true);
        return;
    }
    
    channel.join().then(connection => {
        print("Anson bot joined to play some audio", true, true);
        
        var dispatcher = connection.play(fs.createReadStream(path));

        dispatcher.on("end", end => { 
            channel.leave();
        });
        
    }).catch(e => {
        print(e, true, true, "error");
    })
}