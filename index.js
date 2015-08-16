var db = require("seraph")({server: "http://localhost:7474", user: 'neo4j', pass: '1111'});

var armando = { name: "Armando", age: 30 };
const label = {
  plhebotomist: 'Plhebotomist',
  patient: 'Patient'
};
var saveArmando = saveNode.bind(undefined, armando, label.plhebotomist);
var findArmando = findNodes.bind(undefined, armando);

deleteDB().then(saveArmando).then(findArmando).then(deleteNodes).then(done).catch(error);

function done(res) {
  console.log('success', res)
}

function error(err) {
  console.error('error:', err);
}

function cypher(query) {
  return new Promise(function(resolve, reject) {

    // use db.cyper()
    db.query(query, function(err, results) {
      if (err) {
        return reject(err);
      }

      console.log('run cypher query', query);
      return resolve(results)
    });
  });
}

function saveNode(node, label) {
  console.log('node', node);
  console.log('label', label);

  return new Promise(function(resolve, reject){
    // use db.save()
    db.save(node, label, function(err, node) {
      if (err) {
        return reject(err);
      }

      console.log('saved', node);
      return resolve(node)
    });
  });
};

function findNodes(predicate) {
  return new Promise(function(resolve, reject) {
    // use db.find()
    db.find(predicate, function(err, nodes) {
      if (err) {
        return reject(err);
      }

      console.log('found', nodes);
      return resolve(nodes)
    });
  });
};

// test db.batch()
function deleteNodes(nodes) {
  return new Promise(function(resolve, reject) {
    var txn = db.batch();

    nodes.forEach(function (node) {
      txn.delete(node);
    })

    txn.commit(function(err, results) {
      if (err) {
        return reject(err);
      }

      console.log('deleted', results);
      return resolve(results)
    });
  });
}

function deleteDB(nodes) {
  var query = `
    MATCH (n)
    OPTIONAL MATCH (n)-[r]-()
    DELETE n,r
  `;

  return cypher(query);
}
