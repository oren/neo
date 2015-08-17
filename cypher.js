var request = require("request");

var host = process.env.HOST;
var port = process.env.PORT;
var username = process.env.USER;
var password = process.env.PASS;

var url = `http://${username}:${password}@${host}:${port}/db/data/transaction/commit`;

// can be called with a string or with a statement array
function cypher(statements, cb) {
  if (typeof statements === 'string') {
    statements = [{
        'statement' : statements
      }]
  }

  request.post({
    uri: url,
    json: {statements: statements}
  }, function(err,res) {
    cb(err, res.body)
  })
}

module.exports = cypher;
