// wrapping db.save() with promise

var db = require("seraph")({server: "http://localhost:7474", user: 'neo4j', pass: '1111'});

function saveNode(node, label) {
  return new Promise(function(resolve, reject){
    db.save(node, label, function(err, node) {
      if (err) {
        return reject(err);
      }

      console.log('node saved:', node);
      return resolve(node)
    });
  });
};

module.exports = saveNode;
