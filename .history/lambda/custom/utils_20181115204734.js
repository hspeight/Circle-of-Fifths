exports.shuffleArray = function (data) {

  // Shuffle and return the array

  var i = 0
    , j = 0
    , temp = null

  for (i = data.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = data[i]
    data[i] = data[j]
    data[j] = temp
  }

  return data;

};

exports.reduceArray = function (data, valToRemove) {

  // Return the passed array minus valToRemove
  // https://blog.mariusschulz.com/2016/07/16/removing-elements-from-javascript-arrays#approach-2-filter

  return data.filter(e => e !== valToRemove);

}

exports.getRandom = function (min, max) {

  // Return a random number between min and max
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

exports.capitalizeFirst = function (stringIn) {

  // Capitalize the first charachter of the given string
  return stringIn.charAt(0).toUpperCase() + stringIn.substr(1);

}

exports.capitalizeAll = function (stringIn) {

  // Capitalize the first charachter of each word in the given string
  return stringIn.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

}

exports.periodOfDay = function (hourIn) {

  // Is it morning, afternoon or evening
  if (hourIn < 12 ) {
      var period = 'morning';
  } else if (hourIn < 18) {
      var period = 'afternoon';
  } else {
      var period = 'evening';
  }
  return period

}

exports.makeACircle = function (circleIn) {
  // Utility function to return a circle containing 12 keys

  // randomly select one of the enharmonics from each pair
  var E1 = Math.floor((Math.random() * 2)); // c sharp or d flat
  var E2 = Math.floor((Math.random() * 2)); // f sharp or g flat
  var E3 = Math.floor((Math.random() * 2)); // b or c flat
  
  var subs = [];
  
  if (E1 == 0) {
      subs['E1A']  = 'c sharp';
      subs['E1S']  = '7';
      subs['E1F']  = '0';
      subs['E1R']  = 'a sharp';
  } else {
      subs['E1A']  = 'd flat';
      subs['E1S']  = '0';
      subs['E1F']  = '5';
      subs['E1R']  = 'b flat';
  }
  if (E2 == 0) {
      subs['E2A'] = 'f sharp';
      subs['E2S'] = '6';
      subs['E2F'] = '0';
      subs['E2R'] = 'd sharp';
  } else {
      subs['E2A'] = 'g flat';
      subs['E2S'] = '0';
      subs['E2F'] = '6';
      subs['E2R'] = 'e flat';
  }
  if (E3 == 0) {
      subs['E3A'] = 'b';
      subs['E3S'] = '5';
      subs['E3F'] = '0';
      subs['E3R'] = 'g sharp';
  } else {
      subs['E3A'] = 'c flat';
      subs['E3S'] = '0';
      subs['E3F'] = '7';
      subs['E3R'] = 'a flat';
  }
  
  for (j = 0, len_ = circleIn.length; j < len_; j++) {
    
    //console.log('>' + circleKeys_[j] + '<');
    Object.keys(subs).forEach(function(key) {
      //console.log('$'+circleKeys_[j].indexOf(key)+'$');
      var x = circleIn[j].indexOf(key);
      //console.log('x=' + x + ' ' + circleKeys_[j]);
      if (x >= 0) {
        circleIn[j].splice(x, 1, subs[key]);
      }
  
    });
  }
  return circleIn;

}