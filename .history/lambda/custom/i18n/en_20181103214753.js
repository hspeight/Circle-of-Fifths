const TESTS = 'fourths, fifths, any, or mixed ';
const CHOICES = 3;

module.exports = {
    translation : {
        'CHOICES' : CHOICES,
        'TESTS' : TESTS,

        'TESTS_AVAILABLE' : [
            TESTS
        ],
        'GREETING' : [ // test all these individually to make sure they flow into the question correctly
            'On your marks <break time="1s"/> set <break time="1s"/> ',
            'Let\'s go! ',
            'Here goes! ',
            'Get ready! ',
            'Here we go! ',
            'Ready. Set. Go! ',
            'Hold tight! ',
            'Three. two. one! '
        ],
        'END_GAME_MESSAGE_1' : [
            'You scored %s out of %s'
        ],
        'END_GAME_MESSAGE_2' : [
            'Thanks for playing Circle of Fifths<br/><br/>' +
            'Say %s if you\'d like to play again' 
        ],
        'CONFIRM_RESTART_TEST' : [
            'Are you sure you want to abandon this test?'
        ],
        'RESTART_TEST_FALSE' : [
            'OK. I\'ll continue'
        ],
        'FALLBACK_MESSAGE' : [
            'Sorry but I didn\'t quite understand that. '
        ],
        'FALLBACK_REPROMPT' : [
            'Say help for more information'
        ],
        'ASK_PLAY_AGAIN' : [
            'Say ' + TESTS + 'to play again.'
        ],
        'HELP_MESSAGE_SHORT' : [
            'You can say ' + TESTS
        ],
        'HELP_MESSAGE_LONG' : [
            'In this multiple choice test, you will be asked to name the perfect fourth or fifth from a given note. ' +
            'For example I could ask, what is the fifth of e flat, and offer you three choices. ' +
            'You would then reply with the number that represents the correct answer. ' +
            'Say ' + TESTS + ' to start a test. '
        ],
        'WELCOME_MESSAGE_1' : [
            'Welcome to circle of fifths. '
        ],
        'WELCOME_MESSAGE_2' : [
            'Do you want ' + TESTS + '? '
        ],
        'UNKNOWN_TEST_NAME' : [
            'Sorry. I don\'t know that one. The choices are ' + TESTS
        ],
        'NEW_GAME_MEGGAGE' : [
            'Ok. I\'ll start a new test. Do you want ' +  TESTS
        ],
        'EXIT_SKILL_MESSAGE' : [
            'Please play again soon, Goodbye.'
        ],
        'OUT_OF_RANGE_MSG' : [
            'Your answer should be between 1 and ' + CHOICES
        ],
        'MULTI_CHOICE_HELP_MSG' : [
            'Each answer should be a number between 1 and ' + CHOICES + '. Here is the question again. '
        ],
        'HINT_1' : [
            'tell me about intervals'
        ],
        'CORRECT_ANSWER' : [
            'Correct. '
        ],
        'NEW_TEST_MESSAGE' : [
            'To start a new test you can say ' + TESTS
        ],
        'YES_OR_NO' : [
            'Say yes or no.'
        ],
        'ERROR_1' : [
            'Sorry there was an error!'
        ],
        'ERROR_2' : [
            'There was an error!'
        ],
        'CARD_INFO_1' : [
            'Correct answer is in brackets\n'
        ],
        'SUPERLATIVE_100' : [
            'Superb! ',
            'Magnificent! ',
            'Outstanding! ',
            'Exemplary! ',
            'Wonderful! ',
            'Fabulous! ',
            'Fantastic! '
        ],
        'SUPERLATIVE_80PLUS' : [
            'Excellent! ',
            'Well done! ',
            'Bravo! ',
            'Super! ',
            'Great! ',
            'Admirable! ',
            'Marvelous! '
        ],
        'SUPERLATIVE_NOT_SO_GOOD' : [
            'Better luck next time! ',
            'Keep trying! ',
            'Good effort! ',
            'Try again! '
        ],
    }
}