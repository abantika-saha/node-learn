const http = require('http');
const fs = require('fs');
const _ = require('lodash');

//this callback func runs every time a request
//comes in to our server.
//access to 2 objects, request and response.
//req contains info about the request such as
//URL being requested
//res to send a response to the user in the browser
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    //set header content type
    /*res.setHeader('Content-Type','text/plain');*/
    // res.setHeader('Content-Type','text/html');
    // res.write('<b>Hello, Users</b>');
    // res.end();

    const num=_.random(0,20);
    console.log(num);

    const greet=_.once(()=>{
        console.log("helloo");
    });

    greet();//these functions do not work
    greet();//lodash allows greet to run only once

    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-redirect': //this url redirects to about page
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            res.write(data);
            res.end();
        }
    })
});

//listens to the req
//default value of arg is localhost anyway
//localhoste: listen to the requests coming to our own computer

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
})

//use nodemon to not type node server each time nmanually
//reloading the site will be sufficient
