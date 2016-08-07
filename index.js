const https = require('https');
const fs = require('fs');

var options = {
  protocol: 'https:',
  hostname: 'api.github.com',
  path: '/repos/offcourse/offcourse-roadmap/issues',
  method: 'GET',
  headers: {
    'User-Agent': 'Offcourse-roadmap',
    'Accept': 'application/vnd.github.v3.html+json'
  }
};

var req = https.request(options, (response) => {
  response.setEncoding('utf8');
  var buffer = "", 
    data,
    route;

  response.on("data", function (chunk) {
    buffer += chunk;
  }); 

  response.on("end", function (err) {
    data = JSON.parse(buffer);
    fs.writeFile("build/issues.json", JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
  }); 
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

req.end();