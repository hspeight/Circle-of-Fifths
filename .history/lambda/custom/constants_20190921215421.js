// States that the game can be in at any particular time
const states = {
    START: '_START',
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
};

const circleWithEnharmonics = [{
        keyInfo: { //c major
            relMaj: 'C MAJOR',
            relMin: 'A MINOR',
            intervals: {
                fourth: 'F MAJOR',
                fifth: 'G MAJOR',
                //minor_4th: 'd',
                //minor_5th: 'e',
            },
            signature: {
                sharps: 0,
                flats: 0,
            }
        },
    },
    {
        keyInfo: { //f major
            relMaj: 'F MAJOR',
            relMin: 'D MINOR',
            intervals: {
                fourth: 'B FLAT MAJOR',
                fifth: 'C MAJOR',
            },
            signature: {
                flats: 1,
            },
        },
    },
    {
        keyInfo: { //b flat major
            relMaj: 'B FLAT MAJOR',
            relMin: 'G MINOR',
            intervals: {
                fourth: 'E FLAT MAJOR',
                fifth: 'F MAJOR',
            },
            signature: {
                flats: 2,
            },
            OOF: 1, // position in order of flats
        },
    },
    {
        keyInfo: { //e flat major
            relMaj: 'E FLAT MAJOR',
            relMin: 'C MINOR',
            intervals: {
                fourth: 'A FLAT MAJOR',
                fifth: 'B FLAT MAJOR',
            },
            signature: {
                flats: 3,
            },
            OOF: 2, // position in order of flats
        },
    },
    {
        keyInfo: { //a flat major
            relMaj: 'A FLAT MAJOR',
            relMin: 'F MINOR',
            intervals: {
                fourth: 'D FLAT MAJOR',
                fifth: 'E FLAT MAJOR',
            },
            signature: {
                flats: 4,
            },
            OOF: 3, // position in order of flats
        },
    },
    {
        keyInfo: { //d flat major
            relMaj: 'D FLAT MAJOR',
            relMin: 'B FLAT MINOR/A SHARP MINOR',
            intervals: {
                fourth: 'G FLAT MAJOR/F SHARP MAJOR',
                fifth: 'A FLAT MAJOR',
            },
            signature: {
                flats: 5,
            },
            OOF: 4, // position in order of flats
        },
    },
    {
        keyInfo: { //c sharp major
            relMaj: 'C SHARP MAJOR', // also serves as the note name in order of sharps drill
            relMin: 'B FLAT MINOR/A SHARP MINOR',
            intervals: {
                fourth: 'G FLAT MAJOR/F SHARP MAJOR',
                fifth: 'A FLAT MAJOR',
            },
            signature: {
                sharps: 7,
            },
            OOS: 2, // position in order of sharps
        },
    },
    {
        keyInfo: { //g flat major
            relMaj: 'G FLAT MAJOR', // also serves as the note name in order of flats drill
            relMin: 'E FLAT MINOR/D SHARP MINOR',
            intervals: {
                fourth: 'B MAJOR/C FLAT MAJOR',
                fifth: 'D FLAT MAJOR/C SHARP MAJOR',
            },
            flats: 6,
            OOF: 4, // position in order of flats
        },
    },
    {
        keyInfo: { //F SHARP major
            relMaj: 'F SHARP MAJOR', // also serves as the note name in order oF SHARPs drill
            relMin: 'D SHARP MINOR/E FLAT MINOR',
            intervals: {
                fourth: 'B MAJOR/C FLAT MAJOR',
                fifth: 'D FLAT MAJOR/C SHARP MAJOR',
            },
            signature: {
                sharps: 6,
            },
            OOS: 1, // position in order of flats
        },
    },
    {
        keyInfo: { //b major
            relMaj: 'B MAJOR', // also serves as the note name in order oF SHARPs drill
            relMin: 'G SHARP MINOR/A FLAT MINOR',
            intervals: {
                fourth: 'E MAJOR',
                fifth: 'G FLAT MAJOR/F SHARP MAJOR',
            },
            signature: {
                sharps: 5,
            },
            OOS: 7, // position in order of flats
        },
    },
    {
        keyInfo: { //C FLAT major
            relMaj: 'C FLAT MAJOR', // also serves as the note name in order of flats drill
            relMin: 'G SHARP MINOR/A FLAT MINOR',
            intervals: {
                fourth: 'E MAJOR',
                fifth: 'G FLAT MAJOR/F SHARP MAJOR',
            },
            signature: {
                flats: 7,
            },
            OOF: 6, // position in order of flats
        },
    },
    {
        keyInfo: { //e major
            relMaj: 'E MAJOR', // also serves as the note name in order oF SHARPs drill
            relMin: 'C SHARP MINOR',
            intervals: {
                fourth: 'A MAJOR',
                fifth: 'B MAJOR/C FLAT MAJOR',
            },
            signature: {
                sharps: 4,
            },
            OOS: 6, // position in order of flats
        },
    },
    {
        keyInfo: { //a major
            relMaj: 'A MAJOR', // also serves as the note name in order oF SHARPs drill
            relMin: 'F SHARP MINOR',
            intervals: {
                fourth: 'D MAJOR',
                fifth: 'E MAJOR',
            },
            signature: {
                sharps: 3,
            },
            OOS: 5, // position in order of flats
        },
    },
    {
        keyInfo: { //d major
            relMaj: 'D MAJOR', // also serves as the note name in order oF SHARPs drill
            relMin: 'B MINOR',
            intervals: {
                fourth: 'G MAJOR',
                fifth: 'A MAJOR',
            },
            signature: {
                sharps: 2,
            },
            OOS: 4, // position in order of flats
        },
    },
    {
        keyInfo: { //g major
            relMaj: 'G MAJOR', // also serves as the note name in order oF SHARPs drill
            relMin: 'E MINOR',
            intervals: {
                fourth: 'C MAJOR',
                fifth: 'D MAJOR',
            },
            signature: {
                sharps: 1,
            },
            OOS: 3, // position in order of flats
        },
    },
    {
        keyInfo: { //B FLAT minor
            relMin: 'B FLAT MINOR',
            relMaj: 'D FLAT MAJOR/C SHARP MAJOR',
            intervals: {
                minor_4th: 'D SHARP MINOR/E FLAT MINOR',
                minor_5th: 'F MINOR',
            },
            signature: {
                flats: 5,
            },
        },
    },
    {
        keyInfo: { //A SHARP minor
            relMin: 'A SHARP MINOR',
            relMaj: 'D FLAT MAJOR/C SHARP MAJOR',
            intervals: {
                minor_4th: 'D SHARP MINOR/E FLAT MINOR',
                minor_5th: 'F MINOR',
            },
            signature: {
                sharps: 7,
            },
        },
    },
    {
        keyInfo: { //D SHARP minor
            relMin: 'D SHARP MINOR',
            relMaj: 'G FLAT/F SHARP',
            intervals: {
                minor_4th: 'G SHARP MINOR/A FLAT MINOR',
                minor_5th: 'B FLAT MINOR/A SHARP MINOR',
            },
            signature: {
                sharps: 6,
            },
        },
    },
    {
        keyInfo: { //E FLAT minor
            relMin: 'E FLAT MINOR',
            relMaj: 'G FLAT MAJOR/F SHARP MAJOR',
            intervals: {
                minor_4th: 'G SHARP MINOR/A FLAT MINOR',
                minor_5th: 'B FLAT MINOR/A SHARP MINOR',
            },
            signature: {
                flats: 6,
            },
        },
    },
    {
        keyInfo: { //G SHARP minor
            relMin: 'G SHARP MINOR',
            relMaj: 'B MAJOR/C FLAT MAJOR',
            intervals: {
                minor_4th: 'C SHARP MINOR',
                minor_5th: 'D SHARP MINOR/E FLAT MINOR',
            },
            signature: {
                sharps: 5,
            },
        },
    },
    {
        keyInfo: { //A FLAT
            relMin: 'A FLAT MINOR',
            relMaj: 'B MAJOR/C FLAT MAJOR',
            intervals: {
                minor_4th: 'C SHARP MINOR',
                minor_5th: 'D SHARP MINOR/E FLAT MINOR',
            },
            flats: 7,
        },
    },
]

const languageStrings = {
    'en': require('./i18n/en'),
    //    'it' : require('./i18n/it')
}

// Avialable packs - N.B. PackName MUST match the ISP reference name EXACTLY (not applicable for free pack) and id must match interaction model id
const drills = [
    perfectIntervals = {
        packName: 'Perfect Intervals',
        ref: 'perfect-intervals',
        levels: [{
                'interval': 'fifths',
                'data': ['E FLAT MAJOR', 'G MAJOR']
            },
            {'interval': 'fourths', 'data': ['A MAJOR', 'D FLAT MAJOR'] },
            /*
            {
                'interval': 'fourths',
                'data': ['B MAJOR']
            },
            */
            //{'interval': 'fifths', 'data': ['b flat','f','c','g']},
            //{'interval': 'fourths', 'data': ['d','g','c','f']},
            //{'interval': 'fifths', 'data': ['c','f','b flat','e flat']},
        ]
    },
    relativeKeys = {
        packName: 'Relative Keys',
        ref: 'relative-keys',
        levels: [
            //{
            //    'quality': 'major',
            //    'data': ['B MINOR']
            //}, // what is the relative minor
            {
                'quality': 'minor',
                'data': ['B MAJOR']
            },
            /*
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
            */
            {
                'quality': 'minor',
                'data': ['B MAJOR', 'A MAJOR']
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
]

//const pronounce = {
//        'a flat': '<say-as interpret-as="spell-out">a</say-as> flat',
//        'a': '\'a\'',
//};

const questionTempltes = {
    // Note: Do not change the order of the interval questions. They must be this way round to work peoperly.
    intervalQuestions: {
        fourths: ['what is placeholder the fourth of ?', 'what is the fourth of placeholder ?'], // convert to requestattribue?
        fifths: ['what is the fifth of placeholder ?', 'what is placeholder the fifth of ?']
    },
    relativeKeyQuestions: {
        major: [
                //'What is the relative major key of [key]?',
                //'What is [key] the relative minor of?',
                'Which major key has the relative minor [key]'
                ], // convert to requestattribue?
        minor: ['what is the relative minor key of [key]?', 'what is [key] the relative major of?']
    },
    keySignatureQuestions: {
        major: ['which major key has [number] [sign]?', 'how many [sign] does [key] have?'],
        minor: ['which minor key has [number] [sign]?', 'how many [sign] does [key] have?']
    }
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