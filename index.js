const https = require('https');

var options = {
  protocol: 'https:',
  hostname: 'api.github.com',
  path: '/repos/offcourse/offcourse-roadmap/issues',
  method: 'GET',
  headers: {
    'User-Agent': 'Offcourse-roadmap'
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
    // finished transferring data
    // dump the raw data
    console.log(buffer);
    console.log("\n");
    data = JSON.parse(buffer);
  }); 
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

req.end();