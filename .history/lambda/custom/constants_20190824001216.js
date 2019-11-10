// States that the game can be in at any particular time
const states = {
    START: '_START',
    RESTART: '_RESTART',
    QUIZ: '_QUIZ',
    END: '_END',
    REPLAY: '_REPLAY',
    ENDOFLEVEL: '_ENDOFLEVEL',
    ENDOFDRILL: '_ENDOFDRILL',
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
                flats: '3'
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
            flats: 5,
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
            sharps: 7,
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
            sharps: 6,
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
            sharps: 5,
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
            flats: 7,
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
            sharps: 4,
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
            sharps: 3,
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
            sharps: 2,
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
            sharps: 1,
            OOS: 3, // position in order of flats
        },
    },
    {
        keyInfo: { //B FLAT minor
            relMin: 'B FLAT',
            relMaj: 'D FLAT/C SHARP',
            intervals: {
                minor_4th: 'D SHARP/E FLAT',
                minor_5th: 'F',
            },
            flats: 5,
        },
    },
    {
        keyInfo: { //A SHARP minor
            relMin: 'A SHARP',
            relMaj: 'D FLAT/C SHARP',
            intervals: {
                minor_4th: 'D SHARP/E FLAT',
                minor_5th: 'F',
            },
            sharps: 7,
        },
    },
    {
        keyInfo: { //D SHARP minor
            relMin: 'D SHARP',
            relMaj: 'G FLAT/F SHARP',
            intervals: {
                minor_4th: 'G SHARP/A FLAT',
                minor_5th: 'B FLAT/A SHARP',
            },
            sharps: 6,
        },
    },
    {
        keyInfo: { //E FLAT minor
            relMin: 'E FLAT',
            relMaj: 'G FLAT/F SHARP',
            intervals: {
                minor_4th: 'G SHARP/A FLAT',
                minor_5th: 'B FLAT/A SHARP',
            },
            flats: 6,
        },
    },
    {
        keyInfo: { //G SHARP minor
            relMin: 'G SHARP',
            relMaj: 'B/C FLAT',
            intervals: {
                minor_4th: 'C SHARP',
                minor_5th: 'D SHARP/E FLAT',
            },
            sharps: 5,
        },
    },
    {
        keyInfo: { //A FLAT
            relMin: 'A FLAT',
            relMaj: 'b/C FLAT',
            intervals: {
                minor_4th: 'C SHARP',
                minor_5th: 'D SHARP/E FLAT',
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
                'data': ['E FLAT MAJOR']
            },
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
            {
                'quality': 'major',
                'data': ['B MINOR']
            }, // what is the relative minor
            //{
            //    'quality': 'minor',
            //    'data': ['B MAJOR']
            //},
            {
                'quality': 'minor',
                'data': ['c', 'f', 'b flat', 'e flat', 'a flat', 'd flat', 'c sharp', 'g flat', 'f sharp', 'c flat', 'b', 'e', 'a', 'd', 'g']
            }, // what is the relative major of this minor
            {
                'quality': 'major',
                'data': ['c', 'f', 'b flat', 'a sharp', 'd sharp', 'e flat', 'g sharp', 'a flat', 'c sharp', 'f sharp', 'b', 'e', 'a', 'd', 'g']
            }, // what is the relative major of this minor
            {
                'quality': 'minor',
                'data': ['c', 'f', 'b flat', 'e flat', 'a flat', 'd flat', 'c sharp', 'g flat', 'f sharp', 'c flat', 'b', 'e', 'a', 'd', 'g']
            }, // what is the relative major of this minor
            {
                'quality': 'minor',
                'data': ['c', 'a', 'd']
            }, // what is the relative minor of this major
            {
                'quality': 'major',
                'data': ['c', 'a', 'd']
            },
            {
                'quality': 'minor',
                'data': ['e flat']
            },
            {
                'quality': 'major',
                'data': ['g', 'f sharp', 'd', 'a flat']
            },
            {
                'quality': 'major',
                'data': ['a flat', 'a']
            },
            {
                'quality': 'major',
                'data': ['g sharp', 'a']
            },
            {
                'quality': 'minor',
                'data': ['c flat', 'a']
            },
            {
                'quality': 'minor',
                'data': ['b', 'a']
            },
        ]
    },
    keySignatures = { // which key has 3 sharps
        packName: 'Key Signatures',
        ref: 'key-signatures',
        levels: [{
                //'symbol': 'flats',
                'quality': 'major',
                'data': ['E FLAT MAJOR']
            },
            /*
            {
                //'symbol': 'flats',
                'quality': 'minor',
                'data': ['F SHARP MINOR']
            },
            {
                //'symbol': 'sharps',
                'quality': 'major',
                'data': ['a', 'b', 'c']
            },
            {
                //'symbol': 'sharps',
                'quality': 'minor',
                'data': ['f', 'b flat', 'f sharp']
            },
            */
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
        major: ['what is the relative major of [key] ?', 'what is [key] the relative minor of ?'], // convert to requestattribue'],
        minor: ['what is the relative minor of [key] ?', 'what is [key] the relative major of ?']
    },
    keySignatureQuestions: {
        major: ['which major key has [number] flats?', 'how many flats does [key] have'],
        minor: ['minor question type 1', 'minor question type 2']
    }
}

//intervalQuestions['fourths'] = [
//intervalQuestions['fifths'] = ['what is the fifth of placeholder ?', 'what is placeholder the fifth of ?'];

module.exports = {
    states: states,
    circleWithEnharmonics: circleWithEnharmonics,
    languageStrings: languageStrings,
    drills: drills,
    //pronounce: pronounce,
    questionTempltes: questionTempltes,
}