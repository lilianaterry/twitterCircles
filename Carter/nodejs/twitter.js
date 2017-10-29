var Twitter = require('twitter');
var http = require('http');
var client = new Twitter({
  consumer_key: '7lqxbqzQHLoA9flVT6o2krPCi',
  consumer_secret: 'vCBmlGpswlj2eIxGHvvpWmMRtpLhkvprt67M4PrOsywbRiNgIH',
  access_token_key: '1917957684-EuFf4tPxzhcqvdaqCbIsYUdoEh9yCxUvmhH8iWV',
  access_token_secret: '3M5kQubsrW1rClzF5xKlqBDl3YzTOuwwOkcLqmo17caVn'
});



http.createServer(function (req, res) {
  var params = {screen_name: 'hacktx'};
  client.get('followers/list', params, function(error, tweets, response) {
    if (!error) {
      for(var tweet in tweets.users){
        console.log(tweets.users[tweet].screen_name)
      }
    }
  });
}).listen(8080);
