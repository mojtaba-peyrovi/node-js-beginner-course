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
### part 4: IDE setting
--- 
nothing much.
### part 5: Rendering HTML as Response
---
first we make a new category and copy the server.js files from first part. 
then we want to see how to render html content instead of the 'hello world' we passed to response.write().

For doing this there is a module in Node called FileSystem that we can simply import to our application like this:

```
var fs = require('fs');
```
After importing fs we can open the file and read the contents.filesytem has a method for reading files. we can see it here:

```
fs.readFile('./index.html', null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found');
        } else {
            response.write(data);
        }
        response.end();
    });
    
   ```
   but if we run this it returns all the raw html we wrote in index.html. 
   
   The reason is we said content type is text/plain.
   ```
   response.writeHead(200, {'Content-Type': 'text/plain'});
   ```
   for making it work as expected we need to cahnge text/plain to:
   ```
   text/html
   ```
   ### part 6: Routing
   ---
   In this part we will make a separated javascript file to handle routing and we call it app.js.
   
   First we need to import a new module in the app.js that helps us deal with routing. its called url:
   ```
   var url = require('url');
   ```
   
   The first method from url module we are going to use is url.parse(). we can use it to return any value the is stored as request in the browser and it can fetch the pathname like this:
   ```
   var path = url.parse(request.url).pathname;
   ```
   So now we need to use switch/case function in js to tell what to read in each case. the first case is when we have the root (/)  and we need to tell the app to read index.html.
   in order to do this we can again use fs we used in the last episode. 
   
   We make a new function called renderHTML() and paste the fs code from the last episode and of course we need to import fs on the top of app.js
   ```
   function renderHTML(path, response) {
       fs.readFile(path, null, function(error, data) {
           if (error) {
               response.writeHead(404);
               response.write('File not found');
           } else {
               response.write(data);
           }
           response.end();
       });
   }   
   ```
   Now we can easily just use renderHTML function to load each html page.
   
   The last thing we need to do is to hook the app.js file to server.js. In order to do this we need to require it:
   
   ```
   var app = require('./app');
   ```
   And inside createServer function we pass handleRequest funciton from app. like this:
   ```
   http.createServer(app.handleRequest).listen(8000);
   ```
   ### part 7: About Express
   ---
   Express is a framework made on the top of Node.js to scaffold the necessary files and structures just like Laravel for PHP.
   
   ### part 8,9: Setting up Express
   ---
   We are going to use express. for using express we need a tool called Generator. In order to install it globally we say:
   ```
   Terminal:  npm install -g express-generator
```
It can be done in home or any folder we open the terminal.
Now express is ready globally to be used. we just need to navigate to the root folder or one folder higher than the project we want to make and say:
```
terminal: express <project_name>
```
The next step is to navigate to the recently made project and run:
```
Terminal: npm install
```
Now we can run the project. when we have npm installed, when we want to run the project we just say:
```
npm start
```
The server file is located at __bin__ folder and its called www. we can change the server port there.

 ### part 10: Node.js + express templating engines
 ---
 The default templating engine coming with express is called Jade.
 
 In views/layouts.jade we have the skeleton of the website. just like layout file at laravel. But in jade files we don't use the <> signs but we use the same tag names and with indentation we show the hierarchy.
 
 The name of Jade has changed to [Pug](https://github.com/pugjs/pug) recently.
 
 If we want to write elements inside the tag but on the next line we have to put a period (.) after the tag. 
 
 for adding type to the tag we need to write the type in parenthesis;
 ```
 input(type='text')
 ```
 and in order to add classes and id's we do like this:
 ```
 input(type='text').class-name#anyid
 ```
 When we render a route in routes folder we have this:
 ```
 /* GET home page. */
 router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });
 });
 ```
 this renders the home page we pass the title here, and when we get to the jade file at layout that tile is being loaded. here:
 ```
 doctype html
 html
   head
     title= title
     link(rel='stylesheet', href='/stylesheets/style.css')
   body
     ul
         li My Text
     input(type='text').class-name#anyid
     block content
```
in the same way we can pass as many variables as we want to the view from route file.

for example we can pass condition:true--
```
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', condition: true });
});
```
and when we want to render the layout we can pass this variable and make an if condition:
```
  if  condition
        p it is true
```
this returns 'it is true' on the home page. 

we can also define a variable inside the view like this:

```
- var condition = true
```
It can over-right variables on the top of variables we pass from the route.

We can also make loops. here is an example:

```
 - var anyArray = [1,2,3]
        each value in anyArray
            p= value
```
__block content__: its like yield in laravel blade engine. 

but we dont use section-yield we just write block content in both layout and the view.

* anytime we have a combination of text and variable for the variable we use this notation:
```
#{varaiblle_name}
```   
 ### part 11: Handlebars templating engine
 ---
 In order to start using Handlebars instead of Jade first we need to remove Jade entirely from dependencies and the app. we do it this way:
 ```angularjs
Terminal: npm uninstall jade --save
```
Now it's time to install handlebars:
```angularjs
Terminal: npm install express-handlebars --save
```
Next we require handle bars inside app.js
```angularjs
var hbs = require('express-handlebars');
```      
the we add more settings to app.js
```angularjs
// view engine setup
app.engine('hbs', hbs({extname:'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
```   
Now under views we have to make a new folder called __layouts__.

Then we move layouts.jade into views/layouts folder and rename the extension from jade to hbs.

 * rendering variables is like laravel we just use:
 ```angularjs
{{variable_name}}
```  
* instead of yield we say:
```angularjs
{{{ body}}}
```        
When we want to change the view in order to use hbs we just change the extension again from .jade to .hbs and the good thing is we can use normal html and everytime we want to have variables we just use {{}}.

Also we dont need to extend the layout. we just start writing the html. 

we should also change the error.jade file to error.hbs and edit it like this:
```angularjs
<h1>{{message}}</h1>
```
thats it for error.hbs. just one line.

*here is how we write if statements in handelbars:

```angularjs
{{# if condition }}
 ...
{{ else }}
...
{{/if}}
```
here is how we do each iteration:

```angularjs
{{# each anyArray}}
    {{ this }}
   {{/each}}
   ```
### part 12: Get and Post requests
---
First we copy the last project and save it as  a new project (07).
#### Get Rquest:
Now inside routes/index.js we add a new route like this:
```angularjs
router.get('/test/:id', function(req, res, next) {
   res.render('test', {output: req.params.id});
});
```
the colon behind id means that this route expects an id to be passed.
The output object will be available later in the templating engine.

In order to access the id, we need to fetch it like req.params.id.

* if we had another parameter like param2 we can access it this way:

```angularjs
router.get('/test/:id/:param2', function(req, res, next) {
   res.render('test', {output: req.params.param2});
});
```
Now it's time to create the test view that doesn't still exist.
inside test.hbs (test view) we can access the output object using {{ output }} notation.

Now if we run the application and go to this route: /test/5 it makes 'output' object equal to 5 and fetched is to the view.

#### Post Request:
first we make a simple form in index.hbs view that has one input for id and a submit button. the submission will send a post request to this route: /test/submit

Noe inside route/index.js we add a post route like this:

```angularjs
router.post('/test/submit', function(req, res, next) {
    var id = req.body.id;
    res = redirect('/test/' + id);
});
```
Now when we get to index view and put a number in the form and submit, we will be redirected to the route we want with the id fetched in the url.

### part 13: Express-Validator and Express-Session
---
In order to be able to use validator and session packages we need to install them via npm:
```angularjs
 Terminal: npm install --save express-validator
 
 Terminal: npm install --save express-session
```
Next step is to require them in the project. For doing this we need to import them on the top of app.js:
```angularjs
var expressValidator = require('express-validator');
var expressSession = require('express-session');
```
then we need to set them up after the body being parsed. __Important__: the validator has to be added after this line not before it:
```angularjs
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
```
Now at the end of the 'use' lines we add  the session:
```angularjs
app.use(expressSession({secret: 'max', saveUninitialized:false, resave: false}));
```
The javascript object passed to it simply says save the session only if it's modified not always.

__IMPORTANT:__

Sessions have to be stored on server and cookies just stored the session id. So we need to find a repository online to hook up with our project to save the sessions.For doing this [here](https://github.com/expressjs/session#compatible-session-stores) is a list of them.

We can use the default option which is using of memory but for production we can't do this and we need to setup a server for sessions.

Because we want to check if sessions work we can make some errors and retrieve them from sessions. so, we should change our index route like this:
```angularjs
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', success: false, errors: req.session.errors });
  req.session.errors = null;  
  // first we make sure there is no error saved in session//
});
```
Also there are so many built-in valadators we can use [here](https://github.com/chriso/validator.js#validators)

For validation we need to make a form with post request and get to route/index.js and add this function:
```angularjs
router.post('/submit', function(req, res, next) {
  //check validity
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Invalid passord').isLength({min:4}).equals(req.body.comfirmPassword);
  var errors = req.validationErrors();
  if(errors) {
      req.session.errors = errors;
  }
  res.redirect('/');
});
```
methods check(), validationErrors(), isEmail(), isLength() and equals() all come from express-validation package.

* now we can check the form and see if the validation doesn't pass the form gets redirected back. For seeing the error messages we need to fetch them in the view.

Here is how we fetch success and error messages in the view:
```angularjs
<h1>{{ title }} </h1>
<P> welcome to {{ title }} </p>
<p>No 8</p>
{{# if success }}
    <section class="success">
        <h2>Successful Validation</h2>
    </section>
{{else}}
    {{# if errors }}
        <section class="errors">
            <ul>
                {{#each errors}}
                  <li>{{ this.msg }}</li>
                {{/each}}
            </ul>
        </section>
    {{/if}}
    <form action="/submit" method="post">
        <div class="input">
            <label for="email">E-mail</label>
            <input type="text" id="email" name="email">
        </div>
        <div class="input">
            <label for="password">Password</label>
            <input type="password" id="password" name="password">
        </div>
        <div class="input">
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword">
        </div>
        <button type="submit">Sign up</button>
</form>
{{/if}}
```
In order for the success message to work we need to do some  changes in route/index.js in lines __6, 8, 18, 20__.

Now it works as expected.
 ### part 14: MongoDB setup:
 ---
Installed MongoDB.

### part 15: Insert and get data with MongoDB:
 ---
First we make a new folder for this project (09)

Then we need to navigate to it and run:

```angularjs
  Terminal: npm install --save mongodb
```
It installs the express extension to make it ready to use mongodb.

Then copied some html and css from his github.

Next thing is get to route/index.js and require 2 things:
```angularjs
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
```
then under the imports we add the url:
```angularjs
var url = 'mongodb://localhost:27017/test';
```
test is the name of the built it database for testing. if we have our own database we should write that instead of test.

__IMPORTANT:__ mongodb doesn't have tables, instead of tables, mongodb has _collections_.

all the crud code have been written inside routes/index.js but there is an issue; the function db.collection() doesn't work with newer mnogodb versions and I changed it to 
```angularjs
"mongodb": "^2.2.33"
```
I added this to package.json and ran npm install. Then it worked.
### part 16: Update and Delete data with MongoDB:
 ---
In order to update, the code is so similar to post, just we need to have an id that we can get it from req.body object and also we need to change insertOne to udpdateOne add something like this:
```angularjs
{"_id":ObjectId(id)},{$set: item}
```
as the first and second parameters of updateOne(). Practically these two parameter mean, new data (first object) and old data found by $set in the second object.

Next we need to require one more thing:
```angularjs
var ObjectId = require('mongodb').ObjectID;
```
For deleting the item its so simple we just copy some code from update and change updateOne to deleteOne and erase the second parameter. that's it.
### part 17: MongoDB+Monk
---
In order to make CRUD and some other database functionality with MongoDB we can use a library called Monk. It works with mongodb version 1.4.1 so the first thing is to go to package.json and change the version of mongodb to 1.4.1.

Then we run 
```angularjs
Terminal: npm install --save monk
```
In order to use it first we delete all mongo related codes in route/index.js file. 

Now we should require monk and get user-data object like this:
```angularjs
var db = require('monk')('localhost:27017/test');
var userData = db.get('user-data');
```
Now we can write the get function like this:
```angularjs

router.get('/get-data', function(req, res, next) {
    var resultArray = [];
    var data = userData.find({});
    data.on('succes', function(docs){
        res.render('index', {items: docs});
    });
});
```
Post function is so simple we just add this one line to the code block:
```angularjs
userData.insert(item);
```
For updating we do it two ways:
```angularjs
1)    userData.update({"_id": db.id(id)}, item);   
```
or 
```angularjs
2) userData.updateById(id, item);
```
Also delete can be done two ways similarly.
```angularjs
1) userData.remove({"_id": db.id(id)});
2) userData.removeById(id);
```

### part 18: Mongoose
---
It is something like laravel eloquent. When we install it mongodb extension is alerady built-in so we dont need to have mongodb separately. So, we delete mongodb from package.json and in terminal install mongoose:
```angularjs
Terminal: npm install --save mongoose
```
Then we delete all mongo related codes.

Now we import mongoose and open the database connection like this:
```angularjs
var mongoose = require('mogoose');
mongoose.connect('localhost:27017/test');
```
Next we have to define the schema like this:
```angularjs
var schema = mongoose.Schema;
var userDataSchema = new Schema({
  title: {type: String, required: true},
  content: String,
  author: String
}, {collection:'user-data'});
```
Then we need to define a model like this:
```
var userData = mongoose.model('UserData', userDataSchema);
```
for CRUD it works so similar to laravel eloquent as we can see in the source code.

### END OF SERIES