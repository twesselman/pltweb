//var sw = require("../");
var param = require("../node_modules/swagger-node-express/Common/node/paramTypes.js");
//var url = require("url");
//var swe = sw.errors;

//var petData = require("./service.js");

// the description will be picked up in the resource listing
exports.findUserById = {
  'spec': {
    description : "Operations about Users",  
    path : "/users/{userId}",
    method: "GET",
    summary : "Find user by ID",
    notes : "Returns a user based on ID",
    type : "User",
    nickname : "findUserById",
    produces : ["application/json"],
    parameters : [param.path("userId", "ID of user that needs to be fetched", "string")]
//    responseMessages : [swe.invalid('id'), swe.notFound('user')]
  },
  'action': function (req,res) {
//    if (!req.params.petId) {
//      throw swe.invalid('id'); }
    var id = parseInt(req.params.userId);

    if (1) {
        res.send(JSON.stringify('user'));
    }
//    else throw swe.notFound('user',res);
  }
};

exports.deleteUser = {
  'spec': {
    path : "/users/{id}",
    notes : "removes a user from the store",
    method: "DELETE",
    summary : "Remove an existing user",
    parameters : [param.path("id", "ID of user that needs to be removed", "string")],
//    responseMessages : [swe.invalid('id'), swe.notFound('user')],
    nickname : "deleteUser" 
  },  
  'action': function(req, res) {
    var id = parseInt(req.params.id);
//
    res.send(204);
  }
};