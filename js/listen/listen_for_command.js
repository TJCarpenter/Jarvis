// listen_for_command.js

// Function:
/*
    Await user speech. Determine the command that was spoken and execute the specific command. If the user does not
    state a command after 5 seconds, abort and go back to listening for the trigger.
*/

function listen_for_command() {
    // Check if browser supports SpeechRecognition and SpeechSynthesis
    if (!(window.webkitSpeechRecognition) && !(window.speechRecognition) && !(window.speechSynthesis)) {
        upgrade();
    } else {

        // Initialize SpeechRecognition and SpeechSynthesis
        var speech = new webkitSpeechRecognition() || speechRecognition();
        var synth = window.speechSynthesis;

        // Initialize recognizing state
        var recognizing;

        // Reset Function
        function reset() {
            recognizing = false;
            speech.start()
        }

        speech.continuous = true;
        speech.interimResults = true;
        speech.lang = 'en-US'
        speech.start();

        speech.onstart = function () {
            // When recognition begins
            recognizing = true;
        };

        speech.onresult = function (event) {
            // When recognition produces a result
            var interim_transcript = '';
            var final_transcript = '';

            // main for loop for the final and interem results
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }

            // Determine if the command is a valid command
            if (validCommand()) {


            }

                // speech.abort();
                // recognizing = false;
                // trigger_heard = true;

                // speak(respond_to_greeting);

        };

        const speak = (action) => {
            utterThis = new SpeechSynthesisUtterance(action());
            synth.speak(utterThis);
        };

        speech.onerror = function (event) {
            // Either 'No-speech' or 'Network connection error'
            console.error(event.error);
        };

        speech.onend = function () {
            // When recognition end
            closing_response();
            listen_for_trigger();
        };
    }

}