
exports.setupDrill = function (attributes, userId) {

    const constants = require('../constants');
    const util = require('../utils');
    
    console.log('AAATTRIBUUTES============================================================================================================================');
    console.log(attributes);

    var levelData = attributes.levelData.data;
    var levelProp = attributes.levelData.key;

    if (userId === 'amzn1.ask.account.AEDWVBMTVDH4HMGTUUB2TOY7ZHSVCE3PAGUAIPSSBLCFD3G2F7PY6ZBKWX4MBNWNCVIFYES7EXNTLDPAJMFMEWDCPT5PHJJRC5RWYANCTXW7QRACAV5CF5ZR6IDDYB7ENOBKYSRURAH6FO6NTHEKND55BK3BV6LLQ7FU7Y2DJW6XEECHUPDUKRTH4RXURBCJ53YNYMPVLJV2YJA') {
        var levelArray = levelData;
    } else {
        var levelArray = util.shuffleArray(levelData);
    }

    const circleWithEnharmonics = constants.circleWithEnharmonics;
    const intervalQuestions = constants.questionTempltes.intervalQuestions;
    const relativeKeyQuestions = constants.questionTempltes.relativeKeyQuestions;
    const keySignatureQuestions = constants.questionTempltes.keySignatureQuestions;

    let QA = {
        "QUESTIONS": [],
        "ANSWERS": [],
    }

    for (i = 0; i < levelArray.length; i++) {
        const nextKey = levelArray[i];

        // Generate an array that only contains the user names
        var justKeyNamesArray = circleWithEnharmonics.map(function (arrayItem) {
            return arrayItem.key;
        });

        var indexOfKey = justKeyNamesArray.indexOf(nextKey);

        let Q = Math.floor(Math.random() * 2); // zero or 1 - use length isntead of 2?

        switch (levelProp) {
            case 'relkey':
                quality = circleWithEnharmonics[indexOfKey]['quality'];
                QUESTION = relativeKeyQuestions[quality][Q].replace(/\[key\]/g, nextKey); // replace placeholder with the key
                ANSWER = circleWithEnharmonics[indexOfKey][levelProp];
                break;
            case 'fourth':
            case 'fifth':
                QUESTION = intervalQuestions[levelProp][Q].replace(/placeholder/g, nextKey); // replace placeholder with the key
                ANSWER = Q === 0 ? circleWithEnharmonics[indexOfKey].intervals['fifth'] : circleWithEnharmonics[indexOfKey].intervals['fourth'];
                break;
            case 'sig':
                // get the quality of the key i.e. major or minor
                keyQuality = nextKey.split(" ").slice(-1);
                // get the number of sharps or flats this contains
                sharps = circleWithEnharmonics[indexOfKey]['signature']['sharps'];
                flats = circleWithEnharmonics[indexOfKey]['signature']['flats'];
                // one of the above will be undefined so get the vlaue we actually need
                num = sharps === undefined ? flats : sharps;
                // get correct text to speak
                sign = flats !== undefined ? flats === 1 && Q === 0 ? 'flat' : 'flats' : sharps === 1 && Q === 0 ? 'sharp' : 'sharps';
                // set up the question & answer
                QUESTION = Q === 0 ? keySignatureQuestions[Q].replace(/\[quality\]/g, keyQuality).replace(/\[number\]/g, num).replace(/\[sign\]/g, sign) :
                    keySignatureQuestions[Q].replace(/\[key\]/g, circleWithEnharmonics[indexOfKey]['key']).replace(/\[sign\]/g, sign);
                // hard code the question for c major and a minor
                if (Q === 0 && (nextKey === 'C MAJOR' || nextKey === 'A MINOR')) {
                    QUESTION = 'Which ' + keyQuality + ' key has 0 sharps and 0 flats?';
                }
                ANSWER = Q === 0 ? circleWithEnharmonics[indexOfKey]['key'] : num;
                break;
            default:
                console.log('HWHAP');
        }

        QA.QUESTIONS.push(QUESTION);
        QA.ANSWERS.push(ANSWER);

    }

    //console.log(QA);
    return QA;

}