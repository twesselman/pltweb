var express = require("express")
    , path = require('path')
    , app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/swagger-ui'));


var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://twesselman:mongouser@ds039850.mongolab.com:39850/heroku_app30126243';

var mongo = require('mongodb');

mongo.Db.connect(mongoUri, function (err, db) {
  console.log("Connected to " + mongoUri)
  db.collection('mydocs', function(er, collection) {
    collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
      console.log("Wrote key")
    });
  });
});

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

app.get('/test', function(request, response) {
    response.send('nothing');
});

// Configure the API domain
var port = app.get('port');
var applicationUrl = process.env.ROOT_URI || process.env.C9_HOSTNAME;

console.log('Plantronics API running on ' + applicationUrl);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})