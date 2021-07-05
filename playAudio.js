const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');


function AudioCommands() {
    var channel;

    if(version == "master") channel = client.channels.cache.get('741124788407369859');
    else channel = client.channels.cache.get('846222971668004878'); //trying cache.get instead of fetch

    channel = msg.guild.member(msg.author.id).voice.channel;

    // var audio = [
    //     "./audio/bestie.mp3",
    //     "./audio/deku.mp3",
    //     "./audio/nya.mp3",
    //     "./audio/Rick Astley - Never Gonna Give You Up (Official Music Video).mp3",
    //     "./audio/uwu.mp3",
    //     "https://www.youtube.com/watch?v=Ds14zhfHEvE",
    //     "https://www.youtube.com/watch?v=NkFrnFooMgk",
    //     "https://www.youtube.com/watch?v=grd-K33tOSM"
    // ]
 

    if(dividedMessage[0] == `${pre}play`) {
        var url = rawDividedMessage[1];
        if(!url) {
            msg.channel.send("bestiee thats not a valid url >:c");`~`
            return;
        }

        // ytdl(url, {filter: "audioonly"}).pipe(fs.createWriteStream('./audio/tempaudio.mp3')).on("finish", function() {
        //     playAudio('./audio/tempaudio.mp3', channel.id, 1);
        // });
        ytdl(url, {filter: "audioonly"}).pipe(fs.createWriteStream('./audio/tempaudio.mp3'));
        setTimeout(function() {playAudio('./audio/tempaudio.mp3', channel.id, 1)}, 5000);
    }

    if(["get out anson", `${pre}leave`, `${pre}disconnect`, `${pre}dc`, "stop singing"].includes(message)) { 
        channel.leave();
        return;
    }


    function playAudio(path, channelID, volume = 1) {
        var channel = client.channels.cache.get(channelID);
 
        if(!channel) {
            print("Main voice channel not found", true, true);
            return;
        }
        if(!path) {
            print("Invalid path", true, true);
            return;
        }
        
        channel.join().then(connection => {
            print("Anson bot joined to play some audio", true, true);
            
            var dispatcher = connection.play(fs.createReadStream(path));
            dispatcher.setVolume(1);

            dispatcher.on("end", end => { 
                channel.leave();
            });
            
        }).catch(e => {
            print(e, true, true, "error");
        })
    }
}