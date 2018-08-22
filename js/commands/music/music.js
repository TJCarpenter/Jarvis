//music.js

// Function:
/*
    Supply the functional commands to execute for music
*/


function key_words(string) {
    var commands = ['play', 'pause', 'next'];

    commands.forEach(element => {
        if (element == "play" && string.includes(element)) {
            if (string.includes("by")) {
                console.log("Initial Command: " + element);
                getSongNameAndArtist(string.slice((string.indexOf(element) + element.length + 1), string.length));
            } else {
                console.log("Initial Command: " + element);
                getAdditionalPlayParam(string.slice((string.indexOf(element) + element.length + 1), string.length));
            }            
        };
        if (element == "pause" && string.includes(element)) {
            console.log("Initial Command: " + element);
        };
        if (element == "next" && string.includes(element)) {
            console.log("Initial Command: " + element);
        };
    });

    if (!(string.includes("play")) && !(string.includes("pause")) && !(string.includes("next"))) {
        console.log("Initial Command: unknown");
        return false;
    } else {
        return true;
    }

}

function getSongNameAndArtist(string) {
    var song_name = string.slice(0, string.indexOf("by"));
    var artist = string.slice((string.indexOf("by") + "by".length + 1), string.length)
    console.log("Song Name:" + song_name);
    console.log("Artist Name: " + artist);
}

function getAdditionalPlayParam(string) {
    var play_params = ['artist', 'album', 'genre', 'song'];

    play_params.forEach(element => {
        if (element == "artist" && string.includes(element)) {
            console.log("Secondary Command: " + element);
            getNextParam(string.slice((string.indexOf(element) + element.length + 1), string.length));
        };
        if (element == "album" && string.includes(element)) {
            console.log("Secondary Command: " + element);
            getNextParam(string.slice((string.indexOf(element) + element.length + 1), string.length));
        };
        if (element == "genre" && string.includes(element)) {
            console.log("Secondary Command: " + element);
            getNextParam(string.slice((string.indexOf(element) + element.length + 1), string.length));
        };
        if (element == "song" && string.includes(element)) {
            console.log("Secondary Command: " + element);
            getNextParam(string.slice((string.indexOf(element) + element.length + 1), string.length));
        };
    });

    if (!(string.includes("artist")) && !(string.includes("album")) && !(string.includes("genre")) && !(string.includes("song"))) {
        console.log("Secondary Command: search");
        getNextParam(string);
    }
}

function getNextParam(string) {
    console.log("Next Parameter: " + string);
}