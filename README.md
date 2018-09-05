# Node.js as a beginner

source:" [Academind Channel](https://www.youtube.com/watch?v=JH4qVqplC8E&list=PL55RiY5tL51oGJorjEgl6NVeDbx_fO5jR&index=2)

### part 2: install Node js and make the first App
---
first make sure we have Node.js installed on the machine. 
``` 
in terminal: node -v
```
when we make sure we have it we navigate to project folder and open it in IDE (PhpStrom is a good choice)

then we make a new file called server.js

* in node.js we create our own sever. (server.js)

inside server.js file we write this code: 
```
var http = require('http');
function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello World!');
    response.end();
}
http.createServer(onRequest).listen(8000);
```
now in order to run the server we should navigate to the folder and in terminal say:
```
Terminal: node server.js
```
now the website is ready to open at localhost:8000

### part 3: Modules and Anonymous Functions
---

we made a new folder and made a new file there called app.js

again we need to import http module. like this: 

``` 
var http = require('http');
```
http module is one of the core modules of node.js and that's why we don't need to provide any path for it. This way we can access all functions inside http module.

we can write our own module of course. In order to do this we make a new file called module1.js inside the project folder.

inside the module we define a simple function that simply console logs a message and also a variabl. 

now in order to have this module exported we need to add this code to the end of the module:
```
function myFunction() {
    console.log('Function was called');
}
var myString = 'String';

module.exports.MyFunction = myFunction;
module.exports.myString = myString;
```
Then we need to require them as we did before to the main file (app.js).

just like php that we import classes, here we require them on the top. so in App.js under the http module import we require the module: 
```
var module1 = require('./module1');
```
because module 1 is located in the same directory as app.js we need to add ./ beofore the module name and **_important: we don't ad js extension here._**

now in app.js we can simply instead of hello world we wrote in http.write() we can pass module1.myString. 

Also we can run myFunction() from module1 under it. like this:
```
module1.myFunction();
```
* the task of exporting variables and functions in a module to the application one by one is a duplicate task and and tiresome. In order to avoid this, there is a way to export everything from a module. 

For doing this we make modue2.js and we can define a javascript object and wrap all we need to define inside of it and export all together once. like this:

```
module.exports = {
    myFunction: function(){
        console.log('it works');
    },
    myVariable: 'Exported Variable';
};
```
And of course we need to import module2 to app.js file like this:
```
var module1 = require('./module2');
```
* Anonymous functions:
we could simply instead of defining onRequest() function write it inline, like this:
```
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(module2.myVariable);
    module2.myFunction();
    response.end();).listen(8080);
```
it was just a refactoring for the times we use a function only once and it's not a big function. 
    






