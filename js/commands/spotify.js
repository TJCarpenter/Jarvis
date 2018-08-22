//spotify.js

// Function:
/*
    Supply the functional commands to execute for spotify
*/


function key_words(string) {
    var commands = ['play', 'pause', 'next'];

    commands.forEach(element => {
        if (element == "play" && string.includes(element)) {
            console.log("Initial Command: " + element);
            getAdditionalPlayParam(string.slice((string.indexOf(element) + element.length + 1), string.length));
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