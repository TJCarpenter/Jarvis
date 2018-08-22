// valid_command.js

// Function: 
/*
    Check if the command that was given is a valid command. Returns TRUE or FALSE
*/

function valid_command(command) {

    if (key_words(command)) {
        return true;
    } else {
        return false;
    }
    
}