const http = require('http'); // Loads the http module

http.createServer((req, res) => { // Creates a Web server with an anonymous callback function
    res.write('Hello World!'); // Write a response to the client
    res.end(); // End the response
}).listen(8000); // The Web server listens to port 8000