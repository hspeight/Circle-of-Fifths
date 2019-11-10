'use strict';
 
const tabletojson = require('tabletojson');
 
tabletojson.convertUrl(
    'https://www.officialcharts.com/chart-news/all-the-number-1-singles__7931/',
    function(tablesAsJson) {

      for (var i = 0; i < 1; i++) {
        console.log(tablesAsJson[i]);
      }
    }
);
