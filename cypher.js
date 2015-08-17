var request = require("request");

var host = process.env.HOST;
var port = process.env.PORT;
var username = process.env.USER;
var password = process.env.PASS;

var url = `http://${username}:${password}@${host}:${port}/db/data/transaction/commit`;

function cypher(query, params, cb) {
  request.post({
    uri: url,
    json: {statements: [{statement: query, parameters: {'props': params}}]}
  }, function(err,res) {
    cb(err, res.body)
  })
}

module.exports = cypher;
