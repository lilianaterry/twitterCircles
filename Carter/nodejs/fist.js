var http = require('http');

const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI("default-application_59f4c243e4b06b4ed0ef41fb", "7e3cd397-f62d-4603-9b50-0bd0274257c4");

http.createServer(function (req, res) {
  rapid.call('MicrosoftComputerVision', 'tagImage', {
  'subscriptionKey': 'cf5877e759af417d971a7bdf693f4846',
  'image': 'http://www.goodwp.com/images/201102/goodwp.com_15364.jpg',
  'region': 'westcentralus'

  }).on('success', (payload)=>{
   var obj = JSON.parse(payload)
   var mystring = ""
   for(tag in obj.tags){
     mystring = mystring.concat(obj.tags[tag].name)
     mystring = mystring.concat("\n")
     
   }
   res.end(mystring)
  }).on('error', (payload)=>{
   /*YOUR CODE GOES HERE*/
  });
}).listen(8080);
