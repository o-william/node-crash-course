// // console.log("Hello from Node.js...") 
// const Person = require('./person')

// const person1 = new Person('John Doe', 30)

// person1.greeting();

// LOGGER
// const Logger = require('./logger');

// const logger = new Logger();

// logger.on('message', (data) => console.log('Called Listener:', data));

// logger.log('Hello World');
// logger.log('Another hello!');

// WEB SEVER USING NODE.JS

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {
    console.log(request.url);
    // if(request.url ==='/') {
    //     // index page
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         if (err) throw err;
    //         response.writeHead(200, {'Content-Type': 'text/html'});
    //         response.end(content);
    //     });


    // // In case of JSON content
    // if (request.url === '/api/users') {
    //     const users = [
    //         {name: 'Bob Smith', age: 40},
    //         {name: 'John Doe', age: 30}
    //     ];
    //     response.writeHead(200, {'Content-Type': 'application/json'}); //
    //     // turn the javascript object array into json
    //     response.end(JSON.stringify(users));
    // }

    //     // response.writeHead(200, {'Content-Type': 'text/html'});
    //     // response.end('<h1>Home</h1>');

    // IN CASE OF FILES - THAT CAN BE ANY FILE, AND MANY
    // Build file path
    let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url);

    // get the extension of the file, because we want to set that as the content type
    let extName = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    // Check extension and set content type
    switch (extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read File
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                // Page not found, load an error page.
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end(content, 'utf8');
                });
            } else {
                // Some server error
                response.writeHead(500);
                response.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            response.writeHead(200, {'Content-Type': contentType});
            response.end(content, 'utf8')
        }
    });

    // console.log(filePath);
    // response.end();
});

const PORT = process.env.PORT || 5002; // The port will be specified in environment variables. If it is not there, we run on 5002

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));