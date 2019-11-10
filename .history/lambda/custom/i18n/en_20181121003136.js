const TESTS = 'fourths, fifths, or mixed ';
const CHOICES = 3;

module.exports = {
    translation : {
        'CHOICES' : CHOICES,
        'TESTS' : TESTS,

        'SKILL_NAME' : [
            'Circle of Fifths'
        ],
        'TESTS_AVAILABLE' : [
            TESTS
        ],
        'WELCOME_G' : [
            'Good '
        ],
        'WELCOME_A' : [
            '! and '
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
        //'END_GAME_MESSAGE_2' : [
        //    'Thanks for playing Circle of Fifths<br/><br/>' +
        //    'Say %s if you\'d like to play again' 
        //],
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
            'To play again say ' + TESTS + '.'
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
            '%s Welcome to circle of fifths. '
        ],
        'PICK_A_TEST_MSG' : [
            'Do you want ' + TESTS + '? '
        ],
        'UNKNOWN_TEST_NAME' : [
            'Sorry. I don\'t know that one. The choices are ' + TESTS
        ],
        'NEW_GAME_MEGGAGE' : [
            'Ok. I\'ll start a new test. Do you want ' +  TESTS
        ],
        'EXIT_SKILL_MESSAGE' : [
            'Thank you for playing circle of fifths. Please play again soon, Goodbye.'
        ],
        'OUT_OF_RANGE_MSG' : [
            'Your answer should be between 1 and %s'
        ],
        'MULTI_CHOICE_HELP_MSG' : [
            'Each answer should be a number between 1 and ' + CHOICES + '. Here is the question again. '
        ],
        'HINT_1' : [
            'choose a test for me'
        ],
        'CORRECT_ANSWER' : [
            'Correct. '
        ],
        'NEW_TEST_MESSAGE' : [
            'To start a new test you can say ' + TESTS
        ],
        'NUM_QUESTIONS_CHANGED' : [
            'The number of questions has been changed to %s'
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
            'Fantastic! ',
            'Amazing'
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
            'Better luck next time! How about another go? ',
            'Keep trying! You\'ll improve as you play more! ',
            'Let\'s go again. I\'m sure you can do better! ',
            'Let\'s try again. We\'ll do better next time!',
            'Oh dear! Let\'s have another go and see if we can do a little better'
        ],
        'RANDOM_TEST' : [
            'Let\'s go with ',
            'Let\'s do ',
            'I\'ll give you ',
            'How about ',
            'Let\'s try ',
            'I think we\'ll do '
        ],
        'DISPLAYINTRO1' : [
            'Test your knowledge of the circle of fifths in intervals of perfect '
        ],
        'DISPLAYINTRO2' : [
            ' will give you a test containing a combination of both.'
        ],
        'RELQUESTIONS_4ths' : [
            '0,what is the fourth of X?',
            '1,what is X the fourth of?'
        ],
        'RELQUESTIONS_5ths' : [
            '2,what is the fifth of X?',
            '3,what is X the fifth of?'
        ],
        'SUMMARY_TXT' : [
            ' - Summary'
        ],
    }
}