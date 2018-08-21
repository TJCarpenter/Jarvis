// listen_for_trigger.js

// Function:
/*
    Listen for the trigger word (default: "Hey Jarvis"). After trigger word has been heard,
    stop recognizing a voice, respond to the greeting, then wait for the command given by
    the user for 5 seconds before going back to the original state of listening for the
    trigger word.
*/

// If browser does not have SpeechRecognition or SpeechSynthsis, prompt user to upgrade browser
function upgrade() {
    alert('Please use Google Chrome for the best experience');
}

// Check if browser supports SpeechRecognition and SpeechSynthesis
if (!(window.webkitSpeechRecognition) && !(window.speechRecognition) && !(window.speechSynthesis)) {
    upgrade();
} else {

    // Initialize SpeechRecognition and SpeechSynthesis
    var speech = new webkitSpeechRecognition() || speechRecognition();
    var synth = new speechSynthesis();

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

    speech.onstart = function() {
        // When recognition begins
        recognizing = true;
    };

    speech.onresult = function(event) {
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

        if ((/^hey /g.test(final_transcript)) && (/Jarvis/g.test(final_transcript))) {
            console.log('I heard you loud and clear');
        }
    };

    speech.onerror = function(event) {
        // Either 'No-speech' or 'Network connection error'
        console.error(event.error);
    };

    speech.onend = function() {
        // When recognition end
        reset();
    };

}