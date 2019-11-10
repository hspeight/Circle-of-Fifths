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

exports.pickEnharnomics = function (arrayIn) {

  for (i = 0, len = arrayIn.length; i < len; i++) {
    console.log(i + '>' + arrayIn[i] + '<');

    console.log( i + '-' + arrayIn[i][4]);
    for (j = 0, len2 = arrayIn[i].length; j < len2; j++) {
      //console.log('!' + arrayIn[i][j] + '!');
      a = arrayIn[i][j].split('/');
      var key = a.length == 2 ? a[Math.floor((Math.random() * 2))] : a[0];
      console.log('!' + a + '!' + '!' + a.length + '!' + key);

    }
  }

  return arrayIn;

}