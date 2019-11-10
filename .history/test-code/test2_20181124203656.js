'use strict';
 
const tabletojson = require('tabletojson');
 
tabletojson.convertUrl(
    'https://www.officialcharts.com/chart-news/all-the-number-1-singles__7931/',
    function(tablesAsJson) {

      tablesAsJson.foreach
        console.log(tablesAsJson[1]);
    }
);
