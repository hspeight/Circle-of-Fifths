var columnify = require('columnify');

var data = {
    "commander@0.6.1": 1,
    "minimatch@0.2.14": 3,
    "mkdirp@0.3.5": 2,
    "sigmund@1.0.0": 3
  }
   
  console.log(columnify(data))