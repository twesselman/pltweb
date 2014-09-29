var express = require("express")
    , swagger = require("swagger-node-express")
    , path = require('path')
    , test = require("./models/test")
    , models = require("./models/models")
    , app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/lib', express.static(path.join(__dirname, 'swagger-ui/lib')));
app.use('/css', express.static(path.join(__dirname, 'swagger-ui/css')));
app.use('/images', express.static(path.join(__dirname, 'swagger-ui/images')));

// Couple the application to the Swagger module.
swagger.setAppHandler(app);

// Adding models and methods to our RESTFul service
swagger.addModels(models)
    .addGet(test.dummyTestMethod);
 
// set api info
swagger.setApiInfo({
    title: "Plantronics Management API",
    description: "API to manage Plantronics devices",
    termsOfServiceUrl: "",
    contact: "tom.wesselman@plantronics.com",
    license: "",
    licenseUrl: ""
});


var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://twesselman:mongouser@ds039850.mongolab.com:39850/heroku_app30126243';

/*
var mongo = require('mongodb');

mongo.Db.connect(mongoUri, function (err, db) {
  console.log("Connected to " + mongoUri)
  db.collection('mydocs', function(er, collection) {
    collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
      console.log("Wrote key")
    });
  });
});
*/

var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});

mongoose.connect(mongoUri);

var userSchema = new mongoose.Schema({
  firstName: { type: String }
, lastName: {type: String }
, email: String
, employee_id: Number
, is_active: Boolean
});

// Compile a 'User' model using the userSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Users' for these documents.
var User = mongoose.model('User', userSchema);

var tom = new User({
  firstName: 'Tom'
, lastName: 'Wesselman'
, email: 'twesselman@gmail.com'
, employee_id: '12345'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
, is_active: true
});

tom.save(function(err, tom) {
  if (err) return console.error(err);
  console.dir(tom);
});

app.get('/', function(request, response) {
//    response.send('nothing');
    response.sendFile(__dirname + '/swagger-ui/index.html');
});

// Set api-doc path
swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
var domain = process.env.ROOT_URI;
if ((typeof(domain) === 'undefined') || (domain === null) || (domain.length() <1)) {
  domain = process.env.C9_HOSTNAME;
}

var port = app.get('port');

//console.log(process.env);

/// is the above required???????

// Set and display the application URL
//var applicationUrl = 'https://' + domain + ':' + port;
var applicationUrl = 'https://' + domain;

console.log('Plantronics API running on ' + applicationUrl);
 
//swagger.configure(applicationUrl, '1.0.0');

//*** fix this
swagger.configure(applicationUrl, '1.0.0');
//swagger.configure('https://pltweb-c9-twesselman.c9.io', '1.0.0');




app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

