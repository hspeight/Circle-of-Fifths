'use strict';
 
const tabletojson = require('tabletojson');
 
tabletojson.convertUrl(
    'https://www.officialcharts.com/chart-news/all-the-number-1-singles__7931/',
    function(tablesAsJson) {

      for (var i = 0; i < tablesAsJson.length; i++) {
          if (i === 9) {
            console.log(tablesAsJson[i]);
          }
      }
    }
);
