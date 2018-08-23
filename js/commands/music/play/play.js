class Play {

    constructor(string) {
        this.raw_string = string.replace(new RegExp("\\b" + "play" + "\\b"), "");
        this.command = {
            initial_command: "PLAY",
            artist_name: "",
            album_name: "",
            song: "",
            time_period: "",
            genre: "",
            playlist: ""
        };

        this.artist = (function (raw_string) {
            // Extracts the artists name or the band name from the command

            // Initialize an array of key words that might define that the command is about a band
            var key_words = ['by', 'artist', 'from', 'some', 'band'];

            // Initialize variables
            var set = false; // For if a key word has been found and the predicted artist has been set
            var artist, left;
            var index_count = {};
            var right_side = [];
            var left_side = [];

            // Create an array of the command
            var raw_string = raw_string.split(" ");

            // Loop through every word in the command and determine if the given index value is found in the key words
            raw_string.forEach(element => {

                // If the word is found in the key words list...
                if (key_words.includes(element)) {

                    // Initialize an object key that keeps track of the number of times a key word is seen
                    var key = element;

                    // If the object key already exists, increment the value by 1 else initialize the object value with 1
                    if (key in index_count) {
                        index_count[key] = index_count[key] + 1;
                    } else {
                        index_count[key] = 1;
                    }

                    // If the artist hasn't been set, set the artist
                    if ((!set)) {

                        // Slice the string from the index of the element pluss one
                        artist = raw_string.slice(raw_string.indexOf(element) + 1, raw_string.length);
                        set = true;

                        // Remove the sliced index from the index count object
                        if (key in index_count) {
                            index_count[key] = index_count[key] - 1;
                        }
                    }
                }
            });

            // If artist is defined, reverse the array so that the artist is at the 0th index
            // If artist is not defined, a keyword was not found meaning the command is ambiguous and cannot determine if the given string contains an artist
            if (artist) {
                var split_string_reverse = artist.reverse();
            } else {
                return null;
            }

            // Count the number of times a key word was found, if the value is greater than 1, it means that there may be 2 extra hanging key words or that
            // there is a keyword in the artist name and an aditional key word. 
            // If the cound is less than 1, it means that the artist name was found.
            if ((Object.values(index_count)).reduce((a, b) => a + b, 0) >= 1) {

                // Initialize variables with values
                skip = true;
                left = true;

                // Split the array into a right and a left side. The left side will ccontain all indexes up to the first recognized key word
                // The right side will be the remaining command
                for (var i = 0; i < split_string_reverse.length; i++) {
                    if ((i != 0) && ((key_words.indexOf(split_string_reverse[i]) > -1) || (left == false))) {
                        right_side.push(split_string_reverse[i]);
                        left = false;
                    } else if ((left)) {
                        left_side.push(split_string_reverse[i]);
                    }
                }

                // If the left side is not empty, it means that the hanging keyword was removed. The left side array is then assigned to the main array string
                if (left_side.length != 0) {
                    split_string_reverse = [];
                    return (left_side.reverse()).join(" ");

                }

            } else {

                return (artist.reverse()).join(" ");

            }

        })(this.raw_string);

        this.album_name = null;
        this.song = null;
        this.time_period = null;
        this.genre = null;
        this.playlist = null;
    }
}