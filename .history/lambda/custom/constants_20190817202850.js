// States that the game can be in at any particular time
const states = {
    START: '_START',
    RESTART: '_RESTART',
    QUIZ: '_QUIZ',
    END: '_END',
    REPLAY: '_REPLAY',
    ENDOFLEVEL: '_ENDOFLEVEL',
    ENDOFDRILL: '_ENDOFDRILL',

};

const circleWithEnharmonics = [
    {
        keyInfo: { //c major
            relMaj: 'C',
            relMin: 'A',
            intervals: {
                fourth: 'F',
                fifth: 'G',
                //minor_4th: 'd',
                //minor_5th: 'e',
            },
            //flats: 0,
            //sharps: 0,
        },
    },
    {
        keyInfo: { //f major
            relMaj: 'F',
            relMin: 'D',
            intervals: {
                fourth: 'B FLAT',
                fifth: 'C',
            },
            flats: 1,
        },
    },
    {
        keyInfo: { //b flat major
            relMaj: 'B FLAT',
            relMin: 'G',
            intervals: {
                fourth: 'E FLAT',
                fifth: 'F',
            },
            flats: 2,
            OOF: 1, // position in order of flats
        },
    },
    {
        keyInfo: { //e flat major
            relMaj: 'E FLAT',
            relMin: 'C',
            intervals: {
                fourth: 'A FLAT',
                fifth: 'B FLAT',
            },
            flats: 3,
            OOF: 2, // position in order of flats
        },
    },
    {
        keyInfo: { //a flat major
            relMaj: 'A FLAT',
            relMin: 'F',
            intervals: {
                fourth: 'D FLAT',
                fifth: 'E FLAT',
            },
            flats: 4,
            OOF: 3, // position in order of flats
        },
    },
    {
        keyInfo: { //d flat major
            relMaj: 'D FLAT',
            relMin: 'B FLAT/A SHARP',
            intervals: {
                fourth: 'G FLAT/F SHARP',
                fifth: 'A FLAT',
            },
            flats: 5,
            OOF: 4, // position in order of flats
        },
    },
    {
        keyInfo: { //c sharp major
            relMaj: 'C SHARP',          // also serves as the note name in order of sharps drill
            relMin: 'B FLAT/A SHARP',
            intervals: {
                fourth: 'G FLAT/F SHARP',
                fifth: 'A FLAT',
            },
            sharps: 7,
            OOS: 2, // position in order of sharps
        },
    },
    {
        keyInfo: { //g flat major
            relMaj: 'G FLAT',           // also serves as the note name in order of flats drill
            relMin: 'E FLAT/D SHARP',
            intervals: {
                fourth: 'B/C FLAT',
                fifth: 'D FLAT/C SHARP',
            },
            flats: 6,
            OOF: 4, // position in order of flats
        },
    },
    {
        keyInfo: { //F SHARP major
            relMaj: 'F SHARP',           // also serves as the note name in order oF SHARPs drill
            relMin: 'D SHARP/E FLAT',
            intervals: {
                fourth: 'B/C FLAT',
                fifth: 'D FLAT/C SHARP',
            },
            sharps: 6,
            OOS: 1, // position in order of flats
        },
    },
    {
        keyInfo: { //b major
            relMaj: 'B',           // also serves as the note name in order oF SHARPs drill
            relMin: 'G SHARP/A FLAT',
            intervals: {
                fourth: 'E',
                fifth: 'G FLAT/F SHARP',
            },
            sharps: 5,
            OOS: 7, // position in order of flats
        },
    },
    {
        keyInfo: { //C FLAT major
            relMaj: 'C FLAT',           // also serves as the note name in order of flats drill
            relMin: 'G SHARP/A FLAT',
            intervals: {
                fourth: 'E',
                fifth: 'G FLAT/F SHARP',
            },
            flats: 7,
            OOF: 6, // position in order of flats
        },
    },
    {
        keyInfo: { //e major
            relMaj: 'E',           // also serves as the note name in order oF SHARPs drill
            relMin: 'C SHARP',
            intervals: {
                fourth: 'A',
                fifth: 'B/C FLAT',
            },
            sharps: 4,
            OOS: 6, // position in order of flats
        },
    },
    {
        keyInfo: { //a major
            relMaj: 'A',           // also serves as the note name in order oF SHARPs drill
            relMin: 'F SHARP',
            intervals: {
                fourth: 'D',
                fifth: 'E',
            },
            sharps: 3,
            OOS: 5, // position in order of flats
        },
    },
    {
        keyInfo: { //d major
            relMaj: 'D',           // also serves as the note name in order oF SHARPs drill
            relMin: 'B',
            intervals: {
                fourth: 'G',
                fifth: 'A',
            },
            sharps: 2,
            OOS: 4, // position in order of flats
        },
    },
    {
        keyInfo: { //g major
            relMaj: 'G',           // also serves as the note name in order oF SHARPs drill
            relMin: 'E',
            intervals: {
                fourth: 'C',
                fifth: 'D',
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
    'en' : require('./i18n/en'),
//    'it' : require('./i18n/it')
}

// Avialable packs - N.B. PackName MUST match the ISP reference name EXACTLY (not applicable for free pack) and id must match interaction model id
const drills = [
    perfectIntervals = {
        packName: 'Perfect Intervals',
        id: 'perfect-intervals',
        levels: [
            {'interval': 'fifths', 'data': ['B FLAT']},
            {'interval': 'fourths', 'data': ['B']},
        //{'interval': 'fifths', 'data': ['b flat','f','c','g']},
        //{'interval': 'fourths', 'data': ['d','g','c','f']},
        //{'interval': 'fifths', 'data': ['c','f','b flat','e flat']},
        ]
    },
    relativeKeys = {
        packName: 'Relative Keys',
        id: 'relative-keys',
        levels: [
            {'relative': 'minor', 'data': ['c','f','b flat','e flat','a flat','d flat','c sharp','g flat','f sharp','c flat','b','e','a','d','g']}, // what is the relative major of this minor
            {'relative': 'major', 'data': ['c','f','b flat','a sharp','d sharp','e flat','g sharp','a flat','c sharp','f sharp','b','e','a','d','g']}, // what is the relative major of this minor
            {'relative': 'minor', 'data': ['c','f','b flat','e flat','a flat','d flat','c sharp','g flat','f sharp','c flat','b','e','a','d','g']}, // what is the relative major of this minor
            {'relative': 'minor', 'data': ['c','a','d']}, // what is the relative minor of this major
            {'relative': 'major', 'data': ['c', 'a', 'd']}, 
            {'relative': 'major', 'data': ['c']},
            {'relative': 'minor', 'data': ['e flat']},
            {'relative': 'major', 'data': ['g','f sharp','d','a flat']},
            {'relative': 'major', 'data': ['a flat','a']},
            {'relative': 'major', 'data': ['g sharp','a']}, 
            {'relative': 'minor', 'data': ['c flat','a']}, 
            {'relative': 'minor', 'data': ['b','a']}, 
        ]
    },
    keySignatures = { // which key has 3 sharps
        packName: 'Key Signatures',
        id: 'key-signatures',
        levels: [
            {'symbol': 'flats', 'relative': 'major', 'data': ['a flat']},
            {'symbol': 'flats', 'relative': 'minor', 'data': ['f']},
            {'symbol': 'sharps', 'relative': 'major', 'data': ['a','b','c']},
            {'symbol': 'sharps', 'relative': 'minor', 'data': ['f','b flat','f sharp']},
        ]
    },
    orderOfSharpsAndFlats = { 
        packName: 'Order of Sharps And Flats',
        id: 'order-of-sharps',
    },
    potLuck = { // mixture of everything. Will have a lot of levels so costs more (maybe? Don't want to rinse people?)
        packName: 'Pot Luck',
        id: 'pot-luck',
        levels: [
            {'interval': 'fifths', 'data': ['c flat']},
            {'relative': 'major', 'data': ['a flat','a']},
            {'symbol': 'sharps', 'data': ['a','b','c']},
        ]
    },
]

//const pronounce = {
//        'a flat': '<say-as interpret-as="spell-out">a</say-as> flat',
//        'a': '\'a\'',
//};

//var intervalQuestions = new Array();
// Note: Do not change the order of the interval questions. They must be this way round to work peoperly.
const intervalQuestions = {
    fourths: ['what is placeholder the fourth of ?', 'what is the fourth of placeholder ?'], // convert to requestattribue?
    fifths: ['what is the fifth of placeholder ?', 'what is placeholder the fifth of ?']
}

//intervalQuestions['fourths'] = [
//intervalQuestions['fifths'] = ['what is the fifth of placeholder ?', 'what is placeholder the fifth of ?'];

module.exports = {
    states: states,
    circleWithEnharmonics: circleWithEnharmonics,
    languageStrings: languageStrings,
    drills: drills,
    //pronounce: pronounce,
    intervalQuestions: intervalQuestions,
}
