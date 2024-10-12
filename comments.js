// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];
var server = http.createServer(function(request, response) {
    var parseUrl = url.parse(request.url, true);
    var pathName = parseUrl.pathname;
    if (pathName === '/') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                response.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                
                // Start the server on port 3000
                server.listen(3000, function() {
                    console.log('Server is listening on port 3000');
                });
                response.end('<h1>404 Not Found</h1>');
            } else {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.end(data);
            }
        });
    } else if (pathName === '/getComments') {
        response.writeHead(200, {
            'Content-Type': 'text/json',
            'Access-Control-Allow-Origin': '*'
        });
        response.end(JSON.stringify(comments));
    } else if (pathName === '/addComment') {
        var comment = parseUrl.query;
        comments.push(comment);
        response.end();
    } else {
        fs.readFile('.' + pathName, function(err, data) {
            if (err) {
                response.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                response.end('<h1>404 Not Found</h1>');
            } else {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.end(data);
            }
        });
    }
});

// Add comment