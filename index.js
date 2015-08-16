var db = require("seraph")({server: "http://localhost:7474", user: 'neo4j', pass: '1111'});

const label = {
  plhebotomist: 'Plhebotomist',
  patient: 'Patient'
};

var armando = { name: "Armando", age: 30 };
var saveArmando = saveNode.bind(undefined, armando, label.plhebotomist);
var findArmando = findNodes.bind(undefined, armando);
var bela = { name: "Bela", age: 41 };
var saveBela = saveNode.bind(undefined, bela, label.patient);

// delete db, create a node, find it and delete all nodes in a batch
// uncomment this to try it.
// deleteDB().then(saveArmando).then(findArmando).then(deleteNodes).then(done).catch(error);

// delete db, create 2 nodes and create a 'Nearby' relationship
deleteDB().then(createRelation);

function createRelation() {
  Promise.all([saveArmando(), saveBela()]).then(relateThem);
}

function relateThem(nodes) {
  relate('Nearby', nodes[0], nodes[1]).then(done).catch(error);
}

function done(res) {
  console.log('success')
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

// create a relationship
function relate(relationship, source, target) {
  return new Promise(function(resolve, reject){
    // use db.save()
    db.relate(source, relationship, target, {distance: 12}, function(err, relation) {
      if (err) {
        return reject(err);
      }

      console.log('relationship was created\n', relation);
      return resolve(relation)
    });
  });
};

function deleteDB(nodes) {
  var query = `
    MATCH (n)
    OPTIONAL MATCH (n)-[r]-()
    DELETE n,r
  `;

  return cypher(query);
}
