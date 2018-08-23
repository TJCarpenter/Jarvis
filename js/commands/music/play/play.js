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

            var key_words = ['by', 'artist', 'from', 'some', 'band'];
            var set = false;
            var artist, skip, left;
            var index_count = {};
            var right_side = [];
            var left_side = [];
            var artist_arr = [];
            var dump_arr = [];

            var raw_string = raw_string.split(" ");

            raw_string.forEach(element => {
                if (key_words.includes(element)) {

                    var key = element;

                    if (key in index_count) {
                        index_count[key] = index_count[key] + 1;
                    } else {
                        index_count[key] = 1;
                    }

                    if ((!set)) {
                        artist = raw_string.slice(raw_string.indexOf(element) + 1, raw_string.length);
                        set = true;
                        if (key in index_count) {
                            index_count[key] = index_count[key] - 1;
                        }
                    }
                }
            });

            if (artist) {
                var split_string_reverse = artist.reverse();
            } else {
                return null;
            }

            if ((Object.values(index_count)).reduce((a, b) => a + b, 0) >= 1) {

                skip = true;
                left = true;

                for (var i = 0; i < split_string_reverse.length; i++) {
                    if ((i != 0) && ((key_words.indexOf(split_string_reverse[i]) > -1) || (left == false))) {
                        right_side.push(split_string_reverse[i]);
                        left = false;
                    } else if ((left)) {
                        left_side.push(split_string_reverse[i]);
                    }
                }

                if (left_side.length != 0) {
                    split_string_reverse = [];
                    split_string_reverse = left_side;
                }

            } else {

                return (artist.reverse()).join(" ");

            }

            while (skip) {

                for (let i = 0; i < split_string_reverse.length; i++) {
                    if ((key_words.indexOf(split_string_reverse[i]) > -1)) {

                        var key = split_string_reverse[i];

                        if (skip) {
                            artist_arr.push(split_string_reverse[i]);
                            skip = false;
                        } else {
                            if (key in index_count) {
                                index_count[key] = index_count[key] - 1;
                            }
                            dump_arr.push(split_string_reverse[i]);
                            artist_arr.push('%');
                        }
                    } else {
                        artist_arr.push(split_string_reverse[i]);
                    }

                }

                skip = false;
                return (artist_arr.reverse()).join(" ");
            }

        })(this.raw_string);
        this.album_name = null;
        this.song = null;
        this.time_period = null;
        this.genre = null;
        this.playlist = null;
    }
}