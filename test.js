var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

var request = require('request');
request('url', function(error,response, body){
    if(!error && response.statusCode == 200){
        console.log('API call worked!!!')
        // convert the body response from string to JSON
        var parseData = JSON.parse(body);
        console.log(parseData ['object 1'] [object 2]);
    }
})
