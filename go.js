var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    dictionary = require("./dictionary").dictionary;

port = process.env.PORT || 5000;

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), uri);

  switch(uri)
  {
  case '/dictionary':
    define(request, response);
  default:
    serve(request, response, filename);
  };
}).listen(parseInt(port, 10));

function define(request, response) {
  var body = '';

  request.on('data', function(chunk) {
   body += chunk.toString();
   console.log(body);
  });

  request.on('end', function() {
    var lookup = JSON.parse(body);
    var def = dictionary[lookup.term];

    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify({term: lookup.term, definition: def}));
    response.end();
  });
}

function serve(_, response, filename) {
  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

