var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var ds = require('datastructures-js');

console.log(textualAnalysis("hello"));

function textualAnalysis (text) {
  // Setup information
  var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': 'a42c5a4a-2534-4d4b-ac4f-c8dd2082dfd8',
    'password': 'rYOeEclHS8FP',
    'version_date': '2017-02-27'
  });

  // Requested response data
  var parameters = {
    'text': text,
    'features': {
      'categories': {}
    },
    'language': 'en'
  };
  // weighting formula = (number of times appears * relevance score) / total number of categories

  // Run the analysis
  natural_language_understanding.analyze(parameters, function(err, response) {
    if (err)
      console.log('error:', err);
    else {
      //console.log(JSON.stringify(response, null, 2));
      var jsonObj = JSON.parse(JSON.stringify(response));
      parseResponse(jsonObj);
    }
  });

  // parse the results of the analysis
  function parseResponse(jsonObj) {
    var categoryList = [];
    var categories = jsonObj['categories'];

    // get most specific category
    for (var index = 0; index < categories.length; index++) {
      var score = categories[index]['score'];
      var label = categories[index]['label'];
      var allLabels = label.split('/');
      allLabels.forEach(function(entry) {
        if (entry != '') {
          categoryList.push(entry);
        }
      });
    }
    return categoryList;
  }
}
