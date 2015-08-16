var db = require("seraph")({server: "http://localhost:7474", user: 'neo4j', pass: '1111'});

// create a relationship
function relate(relationship, source, target) {
  return new Promise(function(resolve, reject){
    // use db.save()
    db.relate(source, relationship, target, {distance: 12}, function(err, relation) {
      if (err) {
        return reject(err);
      }

      console.log('relationship saved:', relation);
      return resolve(relation)
    });
  });
};

module.exports = relate;
