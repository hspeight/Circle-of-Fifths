// States that the game can be in at any particular time
const states = {
    //START: '_START',
    RESTART: '_RESTART',
    QUIZ: '_QUIZ',
    END: '_END',
    REPLAYLEVEL: '_REPLAYLEVEL',
    REPLAYDRILL: '_REPLAYDRILL',
    ENDOFLEVEL: '_ENDOFLEVEL',
    ENDOFDRILLWITHUPSELL: '_ENDOFDRILLWITHUPSELL',
    ENDOFDRILLWITHREPLAY: '_ENDOFDRILLWITHREPLAY',
    EXITSKILL: '_EXITSKILL',
    STARTLEVEL: '_STARTLEVEL',
    NEWSESSION: '_NEWSESSION',
    PACKCOMPLETE: '_PACKDONE',
    REFUNDED: '_REFUNDED',
};

const circleWithEnharmonics = [{
        quality: 'major',
        key: 'C MAJOR',
        relKey: 'A MINOR',
        intervals: {
            fourth: 'F MAJOR',
            fifth: 'G MAJOR'
        },
        signature: {
            sharps: 0,
            flats: 0,
        }
    },
    {
        quality: 'major',
        key: 'F MAJOR',
        relKey: 'D MINOR',
        intervals: {
            fourth: 'B FLAT MAJOR',
            fifth: 'C MAJOR'
        },
        signature: {
            flats: 1,
        }
    },
    {
        quality: 'major',
        key: 'B FLAT MAJOR',
        relKey: 'G MINOR',
        intervals: {
            fourth: 'E FLAT MAJOR',
            fifth: 'F MAJOR'
        },
        signature: {
            flats: 2,
        }
    },
    {
        quality: 'major',
        key: 'E FLAT MAJOR',
        relKey: 'C MINOR',
        intervals: {
            fourth: 'A FLAT MAJOR',
            fifth: 'B FLAT MAJOR'
        },
        signature: {
            flats: 3,
        }
    },
    {
        quality: 'major',
        key: 'A FLAT MAJOR',
        relKey: 'F MINOR',
        intervals: {
            fourth: 'D FLAT MAJOR/C SHARP MAJOR',
            fifth: 'E FLAT MAJOR'
        },
        signature: {
            flats: 4,
        }
    },
    {
        quality: 'major',
        key: 'D FLAT MAJOR',
        relKey: 'B FLAT MINOR/A SHARP MINOR',
        intervals: {
            fourth: 'G FLAT MAJOR/F SHARP MAJOR',
            fifth: 'A FLAT MAJOR',
        },
        signature: {
            flats: 5,
        }
    },
    {
        quality: 'major',
        key: 'C SHARP MAJOR', // also serves as the note name in order of sharps drill
        relKey: 'B FLAT MINOR/A SHARP MINOR',
        intervals: {
            fourth: 'G FLAT MAJOR/F SHARP MAJOR',
            fifth: 'A FLAT MAJOR',
        },
        signature: {
            sharps: 7,
        },
    },
    {
        quality: 'major',
        key: 'F SHARP MAJOR', // also serves as the note name in order of sharps drill
        relKey: 'E FLAT MINOR/D SHARP MINOR',
        intervals: {
            fourth: 'B MAJOR/C FLAT MAJOR',
            fifth: 'D FLAT MAJOR/C SHARP MAJOR',
        },
        signature: {
            sharps: 6,
        },
    },
    {
        quality: 'major',
        key: 'G FLAT MAJOR', // also serves as the note name in order of sharps drill
        relKey: 'E FLAT MINOR/D SHARP MINOR',
        intervals: {
            fourth: 'B MAJOR/C FLAT MAJOR',
            fifth: 'A FLAT MAJOR',
        },
        signature: {
            flats: 6,
        },
    },
    {
        quality: 'major',
        key: 'B MAJOR', // also serves as the note name in order of sharps drill
        relKey: 'A FLAT MINOR/G SHARP MINOR',
        intervals: {
            fourth: 'E MAJOR',
            fifth: 'G FLAT MAJOR/F SHARP MAJOR',
        },
        signature: {
            sharps: 5,
        },
    },
    {
        quality: 'major',
        key: 'C FLAT MAJOR', // also serves as the note name in order of sharps drill
        relKey: 'A FLAT MINOR/G SHARP MINOR',
        intervals: {
            fourth: 'E MAJOR',
            fifth: 'G FLAT MAJOR/F SHARP MAJOR',
        },
        signature: {
            flats: 7,
        },
    },
    {
        quality: 'major',
        key: 'E MAJOR', // also serves as the note name in order of sharps drill
        relKey: 'C SHARP MINOR',
        intervals: {
            fourth: 'A MAJOR',
            fifth: 'C FLAT MAJOR/B MAJOR',
        },
        signature: {
            sharps: 4,
        },
    },
    {
        quality: 'major',
        key: 'A MAJOR', // also serves as the note name in order of sharps drill
        relKey: 'F SHARP MINOR',
        intervals: {
            fourth: 'D MAJOR',
            fifth: 'E MAJOR',
        },
        signature: {
            sharps: 3,
        },
    },
    {
        quality: 'major',
        key: 'D MAJOR', // also serves as the note name in order of sharps drill
        relKey: 'B MINOR',
        intervals: {
            fourth: 'G MAJOR',
            fifth: 'A MAJOR',
        },
        signature: {
            sharps: 2,
        },
    },
    {
        quality: 'major',
        key: 'G MAJOR', // also serves as the note name in order of sharps drill
        relKey: 'E MINOR',
        intervals: {
            fourth: 'C MAJOR',
            fifth: 'D MAJOR',
        },
        signature: {
            sharps: 1,
        },
    },
    // - - - - - - - - - - - - - - - - - - M I N O R  K E Y S - - - - - - - - - - - - - - - - -//
    {
        quality: 'minor',
        key: 'A MINOR',
        relkey: 'C MAJOR',
        intervals: {
            fourth: 'D MINOR',
            fifth: 'E MINOR'
        },
        signature: {
            sharps: 0,
            flats: 0,
        }
    },
    {
        quality: 'minor',
        key: 'D MINOR',
        relkey: 'F MAJOR',
        intervals: {
            fourth: 'G MINOR',
            fifth: 'A MINOR'
        },
        signature: {
            flats: 1,
        }
    },
    {
        quality: 'minor',
        key: 'G MINOR',
        relkey: 'B FLAT MAJOR',
        intervals: {
            fourth: 'C MINOR',
            fifth: 'D MINOR'
        },
        signature: {
            flats: 2,
        }
    },
    {
        quality: 'minor',
        key: 'C MINOR',
        relkey: 'E FLAT MAJOR',
        intervals: {
            fourth: 'F MINOR',
            fifth: 'G MINOR'
        },
        signature: {
            flats: 3,
        }
    },
    {
        quality: 'minor',
        key: 'F MINOR',
        relkey: 'A FLAT MAJOR',
        intervals: {
            fourth: 'B FLAT MINOR/A SHARP MINOR',
            fifth: 'C MINOR'
        },
        signature: {
            flats: 4,
        }
    },
    {
        quality: 'minor',
        key: 'B FLAT MINOR',
        relkey: 'D FLAT MAJOR/C SHARP MAJOR',
        intervals: {
            fourth: 'E FLAT MINOR/D SHARP MINOR',
            fifth: 'F MINOR'
        },
        signature: {
            flats: 5,
        }
    },
    {
        quality: 'minor',
        key: 'A SHARP MINOR',
        relkey: 'D FLAT MAJOR/C SHARP MAJOR',
        intervals: {
            fourth: 'E FLAT MINOR/D SHARP MINOR',
            fifth: 'F MINOR'
        },
        signature: {
            sharps: 7,
        }
    },
    {
        quality: 'minor',
        key: 'D SHARP MINOR',
        relkey: 'G FLAT MAJOR/F SHARP MAJOR',
        intervals: {
            fourth: 'A FLAT MINOR/G SHARP MINOR',
            fifth: 'A SHARP MINOR/B FLAT MINOR'
        },
        signature: {
            sharps: 6,
        }
    },
    {
        quality: 'minor',
        key: 'E FLAT MINOR',
        relkey: 'G FLAT MAJOR/F SHARP MAJOR',
        intervals: {
            fourth: 'A FLAT MINOR/G SHARP MINOR',
            fifth: 'A SHARP MINOR/B FLAT MINOR'
        },
        signature: {
            flats: 6,
        }
    },
    {
        quality: 'minor',
        key: 'G SHARP MINOR',
        relkey: 'C FLAT MAJOR/B MAJOR',
        intervals: {
            fourth: 'C SHARP MINOR',
            fifth: 'D SHARP MINOR/E FLAT MINOR'
        },
        signature: {
            sharps: 5,
        }
    },
    {
        quality: 'minor',
        key: 'A FLAT MINOR',
        relkey: 'C FLAT MAJOR/B MAJOR',
        intervals: {
            fourth: 'C SHARP MINOR',
            fifth: 'D SHARP MINOR/E FLAT MINOR'
        },
        signature: {
            flats: 7,
        }
    },
    {
        quality: 'minor',
        key: 'C SHARP MINOR',
        relkey: 'E MAJOR',
        intervals: {
            fourth: 'F SHARP MINOR',
            fifth: 'G SHARP MINOR/A FLAT MINOR'
        },
        signature: {
            sharps: 4,
        }
    },
    {
        quality: 'minor',
        key: 'F SHARP MINOR',
        relkey: 'A MAJOR',
        intervals: {
            fourth: 'B MINOR',
            fifth: 'C SHARP MINOR'
        },
        signature: {
            sharps: 3,
        }
    },
    {
        quality: 'minor',
        key: 'B MINOR',
        relkey: 'D MAJOR',
        intervals: {
            fourth: 'E MINOR',
            fifth: 'F SHARP MINOR'
        },
        signature: {
            sharps: 2,
        }
    },
    {
        quality: 'minor',
        key: 'E MINOR',
        relkey: 'G MAJOR',
        intervals: {
            fourth: 'A MINOR',
            fifth: 'B MINOR'
        },
        signature: {
            sharps: 1,
        }
    },

]

const languageStrings = {
    'en': require('./i18n/en'),
    //    'it' : require('./i18n/it')
}

// Avialable packs - N.B. PackName MUST match the ISP reference name EXACTLY (not applicable for free pack) and id must match interaction model id
const drills = {
    'perfect-intervals': {
        'name': 'Perfect Intervals',
        'levels': [{
                'key': 'fifth',
                'data': ['A FLAT MAJOR']
            },
            /*
            {
                'key': 'fourth',
                'data': ['E MAJOR']
            },
            */
        ]
    },
    'relative-keys': {
        'name': 'Relative Keys',
        'levels': [{
            'key': 'relkey',
            'data': ['F SHARP MINOR']
        }, 
        {
            'key': 'relkey',
            'data': ['B MINOR']
        },]
    },
    'key-signatures': {
        'name': 'Key Signatures',
        'levels': [{
            'key': 'sig',
            'data': ['D MINOR']
        }, ]
    },

    /*
    pack: {
        packName: 'Perfect Intervals',
        ref: 'perfect-intervals',
        levels: [{
                'interval': 'fifths',
                'data': ['B FLAT MAJOR']
            },
            {'interval': 'fourths', 'data': ['C MAJOR'] },
            
            {
                'interval': 'fourths',
                'data': ['B MAJOR']
            },
            
            //{'interval': 'fifths', 'data': ['b flat','f','c','g']},
            //{'interval': 'fourths', 'data': ['d','g','c','f']},
            //{'interval': 'fifths', 'data': ['c','f','b flat','e flat']},
        ]
    },
    
    pack: {
        packName: 'Relative Keys',
        ref: 'relative-keys',
        levels: [
            //{
            //    'quality': 'major',
            //    'data': ['B MINOR']
            //}, // what is the relative minor
            {
                'quality': 'major',
                'data': ['F SHARP MINOR', 'A MINOR']
            },
            {
                'quality': 'major',
                'data': ['B MINOR', 'A MINOR']
            },
            {
                'quality': 'minor',
                'data': ['D MAJOR']
            },
            
            {
                'quality': 'minor',
                'data': ['C MAJOR', 'F MAJOR', 'B FLAT MAJOR', 'E FLAT MAJOR', 'A FLAT MAJOR', 'D FLAT MAJOR', 'C SHARP MAJOR', 'G FLAT MAJOR', 
                         'F SHARP MAJOR', 'C FLAT MAJOR', 'B MAJOR', 'E MAJOR', 'A MAJOR', 'D MAJOR', 'G MAJOR']
            }, // what is the relative major of this minor
            {
                'quality': 'major',
                'data': ['C MINOR', 'F MINOR', 'B FLAT MINOR', 'A SHARP MINOR', 'D SHARP MINOR', 'E FLAT MINOR', 'G SHARP MINOR', 'A FLAT MINOR', 
                         'C SHARP MINOR', 'F SHARP MINOR', 'B MINOR', 'E MINOR', 'A MINOR', 'D MINOR', 'G MINOR']
            }, // what is the relative major of this minor
            {
                'quality': 'minor',
                'data': ['C MAJOR', 'A MAJOR', 'D MAJOR']
            }, // what is the relative minor of this major
            {
                'quality': 'major',
                'data': ['C MINOR', 'A MINOR', 'D MINOR']
            },
            
            
        ]
    },
    
    keySignatures = { // which key has 3 sharps
        packName: 'Key Signatures',
        ref: 'key-signatures',
        levels: [
            
            //{'quality': 'major',  'data': ['E FLAT MAJOR','B MAJOR','C MAJOR','F MAJOR'] },
            {'quality': 'minor',  'data': ['B MINOR'] },

            
            {
                //'symbol': 'flats',
                'quality': 'minor',
                'data': ['B MINOR']
            },
            
            {
                //'symbol': 'sharps',
                'quality': 'major',
                'data': ['A MAJOR', 'B MAJOR', 'C MAJOR']
            },
            {
                //'symbol': 'sharps',
                'quality': 'minor',
                'data': ['F MINOR', 'B FLAT MINOR', 'F SHARP MINOR']
            },
            
        ]
    },
    
    orderOfSharpsAndFlats = {
        packName: 'Order of Sharps And Flats',
        ref: 'order-of-sharps',
    },
    potLuck = { // mixture of everything. Will have a lot of levels so costs more (maybe? Don't want to rinse people?)
        packName: 'Pot Luck',
        ref: 'pot-luck',
        levels: [{
                'interval': 'fifths',
                'data': ['c flat']
            },
            {
                'relative': 'major',
                'data': ['a flat', 'a']
            },
            {
                'symbol': 'sharps',
                'data': ['a', 'b', 'c']
            },
        ]
    },
    */
}

//const pronounce = {
//        'a flat': '<say-as interpret-as="spell-out">a</say-as> flat',
//        'a': '\'a\'',
//};

const questionTempltes = {
    // Note: Do not change the order of the interval questions. They must be this way round to work peoperly.
    intervalQuestions: {
        fourth: ['What is placeholder the fourth of ?', 'What is the fourth of placeholder ?'], // convert to requestattribue?
        fifth: ['What is the fifth of placeholder ?', 'What is placeholder the fifth of ?']
    },
    relativeKeyQuestions: {
        minor: [
            'What is the relative major key of [key]?',
            'What is the relative major of [key]?',
            'What is the relative major to [key]?',
            'What is [key] the relative minor of?',
            'Which major key has the relative minor key of [key]?',
            '[key] is relative to which major key?'
        ], // convert to requestattribue?
        major: [
            'What is the relative minor key of [key]?',
            'What is the relative minor to [key]?',
            'What is [key] the relative major of?',
        ],
        //random: [
        // What is the relative key of F minor?
        // what is the relative key of B major?
        //],
        //trueFalse: [
        // the rlelative major if C minor is F major?
        // the relative minor of D major is A flat minor?
        //]
    },
    keySignatureQuestions: ['Which [quality] key has [number] [sign]?', 'How many [sign] does [key] have?']
    //minor: ['Which minor key has [number] [sign]?', 'How many [sign] does [key] have?']

}

const freePackRef = 'perfect-intervals';

module.exports = {
    states: states,
    circleWithEnharmonics: circleWithEnharmonics,
    languageStrings: languageStrings,
    drills: drills,
    freePackRef: freePackRef,
    questionTempltes: questionTempltes,
}