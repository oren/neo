var db = require("seraph")({server: "http://localhost:7474", user: 'neo4j', pass: '1111'});

function deleteDB() {
  var query = `
    MATCH (n)
    OPTIONAL MATCH (n)-[r]-()
    DELETE n,r
  `;

  return cypher(query);
}

// private

// this is an example of using db.query()
function cypher(query) {
  return new Promise(function(resolve, reject) {
    db.query(query, function(err, results) {
      if (err) {
        return reject(err);
      }

      return resolve(results)
    });
  });
}

module.exports = deleteDB;
