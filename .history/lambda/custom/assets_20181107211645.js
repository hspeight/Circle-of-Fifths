// move the image asstes out of index.js to here
    
//const mainImage = 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/COF_5.png';
//const mainImgBlurBG = 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/pianokeys2.jpg';
//const trophyImage = 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/trophy-01_icarus.png';
//const gameEndImageNot100 = 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/COF_background_game_end_not_100_percent.png';
//const gameEndImageNot100 = 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/BG12keysNot100.png';
//const gameEndImage100 = 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/COF_background_game_end_100_percent.png';
//const gameEndImage100 = 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/BG12keys100.png';

//const wrongAnswerAudio = 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/wrong-answer.mp3';

module.exports.ASSET_IMG = Object.freeze({
    mainImage : 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/COF_5.png',
    mainImgBlurBG : 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/pianokeys2.jpg',
    trophyImage : 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/trophy-01_icarus.png',
    gameEndImageNot100 : 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/BG12keysNot100.png',
    gameEndImage100 : 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/BG12keys100.png'
});
module.exports.ASSET_AUD = Object.freeze({
    wrongAnswerAudio : '"https://s3-eu-west-1.amazonaws.com/circle-of-fifths/wrong-answer.mp3"'
});