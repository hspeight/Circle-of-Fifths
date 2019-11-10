'use strict';
 
const tabletojson = require('tabletojson');
const Json2csvParser = require('json2csv').Parser;
const fields = ['dud1', '0', '1', '2', '3'];
const opts = { fields, header: false };

tabletojson.convertUrl(
    'https://www.officialcharts.com/chart-news/all-the-number-1-singles__7931/',
    function(tablesAsJson) {

      for (var i = 0; i < tablesAsJson.length; i++) {
          if (i > 8) { // Table 9 = 1960
            try {
                const parser = new Json2csvParser(opts);
                const shifted = tablesAsJson[i].shift();
                const csv = parser.parse(tablesAsJson[i]); //remove individual table headings
                console.log(csv);
              } catch (err) {
                console.error(err);
              }
          }
      }
    }
);
