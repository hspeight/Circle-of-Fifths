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

exports.updatedrillStaus = function (drillStatus) {

  
}
/*
exports.getPackName = function (data, id) {

  // search the passed array of objects for the requested id
  //console.log(data);
  //console.log(id);
  return data.filter(function(drill) { return drill.id === id });

}
*/