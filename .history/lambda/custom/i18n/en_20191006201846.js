const SKILLNAME = 'Circle of fifths';

module.exports = {
    translation : { 
        'FIRST_TIME': [
            'Welcome to the ' + SKILLNAME + ' skill. I\'m going to ask you some questions in a series of drills that will help you to learn all about the circle of fifths. ' +
            'Each drill will contain a number of levels that increase in difficulty. You will need to score one hunderd percent on each level in order to complete the drill. ' +
            'The first drill is called %s and has %s levels. You can say help at any time for more information. Are you ready to play? '
        ],
        'FIRST_TIME_REP': [
            'You can say help at any time. Are you ready to start the %s drill?'
        ],
        'HELP_MESSAGE_LONG': [
            'The circle of fifths, also known as the circle of fourths, is a musical construct that describes the relationship between chords, keys, and scales. ' +
            'This skill offers a way to help learn about the circle through a questions grouped into drills. ' +
            'The drills currently available are, %s. To open a drill pack you can say play, and then the name of the drill pack. For example, you can say, play key signatures. ' +
            'Would you like to continue with %s ?'
        ],
        'HELP_MESSAGE_SHORT': [
            'Are you ready to continue? '
        ],
        'LEVEL_TXT': [
            'Level %s - Question %s '
        ],
        'WELCOME_G' : [
            'Good '
        ],
        'WELCOME_BACK' : [
            'Welcome back to ' + SKILLNAME + ' . This is the %s drill, and you are on level %s. ',
        ],
        'ASK_IF_READY' : [
            'Are you ready to play? ',
            'Are you ready to start? ',
            'Are you ready? ',
            'Shall we start? '
        ],
        'WELCOME_BACK_DRILL_COMPLETE' : [
                'Welcome back to ' + SKILLNAME + '. This is the %s drill which you have completed. ',
        ],
        'STARTER1' : [ // test all these individually to make sure they flow into the question correctly
            'If you\'re ready let\'s go! ',
            'Let\'s go! ',
            'Here goes! ',
            'Get ready! ',
            'Here we go! ',
            'Ready? ',
            'Hold tight! ',
            'Let\'s do it! '
        ],
        'STARTER2': [
            'Let\'s get started with %s level %s. ',
            'Let\'s get going with %s level %s',
            'Let\'s kick off with %s level %s',
            'This is %s level %s',
        ],
        'CURRENT_LEVEL': [
            'This is the %s drill, and your current level is %s. '
        ],
        'SWITCH_DRILL': [
            'OK. Switching to %s, level %s. ',
        ],
        'COF_EXPLANATION' : [
            'The circle of fifths, also known as the circle of fourths, is a music theory construct that helps you to memorize and understand relationships between keys. ' + 
            'Traversing the circle clockwise presents the keys in intervals of fifths, whereas counter clockwise presents them in fourths. ' +
            'More information is available from the skill description in the skill store.'
        ],
        'LEVEL_TO_PLAY' : [
            'This is the %s drill. This drill contains %s levels and you are currently on level %s. Questions in this level are based on intervals of %s. You need a %s percent score to progress to the next level. ',
        ],
        'REPLAY_LEVEL' : [
            'Drill %s, round %s. '
        ],
        'GAMEPLAY' : [
            'There are in this round.  ',
        ],
        'END_LEVEL_MESSAGE_1' : [
            'You have completed %s level %s with a score of %s out of %s. '
        ],
        'HASDISPLAY_TITLE' : [
            'Question %s of %s - %s'
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
        'ASK_REPLAY_LEVEL' : [
            'Your score for level %s was %s out of %s. Would you like to try this level again?'
        ],
        'ASK_PLAY_NEXT_LEVEL' : [
            'Are you ready for the next level?'
        ],
        'END_OF_DRILL' : [
            // this needs to say there is a companion drill called [drill name] available
            'You have completed the %s drill. Would you like to hear about the next drill which is called %s?'
            // There is a companion drill called relative keys available. would you like more information about the relative keys drill?'
        ],
        'PACK_DECLINED_MSG2': [
            'You can purchase the pack at any time by saying, <emphasis level="strong">buy</emphasis> %s pack. ' +
                    'What would you like to do next? You can say, what can I play, to see what is available. ',
        ],
        'PACK_DECLINED_MSG1' : [
            'That\'s Ok. ',
            'No problem. ',
            'That\'s fine. ',
            'Sure thing. ',
        ],
        'ALREADY_OWNED': [
            'You already own the %s pack. ',
        ],
        'PACKS_PURCHASED': [
            'You have purchased the %s pack. You can also play the perfect intervals game. ',
        ],
        'WHAT_TO_DO_NEXT' : [
            'What would you like to do next? ',
		    //'Can I give you another greeting?',
		    //'Do you want to hear another greeting?'
        ],
        'RANDOM_LEARN_MORE_PROMPT' : [
            'Would you like to learn more about the %s pack?',
		    'Should I tell you more about the %s pack?',
		    'Do you want to learn more about the %s pack?',
        ],
        'NO_PRODUCTS_OWNED' : [
            'You don\'t own any additional packs for this skill yet. You can continue to play the perfect intervals pack for as long as you like. ',
        ],
        'WHAT_CAN_I_BUY': [
            'To learn more about the packs you can buy, say - what can I buy. ',
        ],
        'UNKNOWN_PACK_REQUESTED': [
            'I don\'t know that product. '
        ],
        'START_LEVEL_MSG': [
            'This is the %s drill, level %s. '
        ],
        'EXIT_SKILL_MESSAGE' : [
            'Thank you for playing circle of fifths. Please play again soon.'
        ],
        'OUT_OF_RANGE_MSG' : [
            'Your answer should be between 1 and %s'
        ],
        'HINT_1' : [
            'choose a test for me'
        ],
        'CORRECT_ANSWER' : [
            'Correct! ',
            'Correct answer! ',
            'That\'s correct! ',
            'That is correct! ',
            'That\'s right! ',
            'That is right! ',
            'Right! ',
            'Right answer! ',
            'It is! ',
            'You\'re correct! ',
            'You\'re right! ',
        ],
        'WRONG_ANSWER' : [
            'Wrong! ',
            'That\'s wrong! ',
            'That is wrong! ',
            'Incorrect! ',
            'Not correct',
            'No! ',
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
            'Amazing! ',
            'First rate! ',
            'commendable! ',
            'First class!',
            'Excellent! ',

        ],
        'SUPERLATIVE_80PLUS' : [
            //'Well done! ',
            //'Bravo! ',
            //'Super! ',
            //'Great! ',
            'Admirable! ',
            'Very good, keep trying! ',
            'Nice try!',

        ],
        'SUPERLATIVE_NOT_SO_GOOD' : [
            'Better luck next time! How about another go? ',
            'Keep trying! You\'ll improve as you play more! ',
            'Let\'s go again. I\'m sure you can do better! ',
            'Let\'s try again. We\'ll do better next time! ',
        ],
        'SUPERLATIVE_ZERO_SCORE' : [
            'You didn\'t score any points this time! ',
        ],
        'SUPERLATIVE_END_OF_LEVEL' : [
            'Great! ',
            'Nice! ',
            'Lovely! ',
            'Good! ',

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
        'BYE_YALL' : [
            'Thanks for playing ' + SKILLNAME + '.',
        ],
        'WELCOME_MESSAGE_FIRST_TIME' : [
            'Welcome to circle of fifths. I have some drills that can help you to learn the keys on the circle. '+
            'The first drill is called perfect fourths. Are you ready?'
        ],
        
    }
}