

const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const ISPHelp = require('../lambda/custom//helpers/ISPHelper');
const drills = constants.drills;


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
                'quality': 'major',
                'data': ['B MINOR', 'A MINOR']
            },
            {
                'quality': 'minor',
                'data': ['D MAJOR']
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

    console.log(drills.length);

    