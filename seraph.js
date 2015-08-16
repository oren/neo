// example of using seraph.
//
// it's an NPM package that makes it easy to interact with Neo4j.
// it has a few helper functions that sits on top of Neo4j's REST API. A few example - `db.save(node)`, `db.find(node)`, and `db.query(cypher)`

var db = require("seraph")({server: "http://localhost:7474", user: 'neo4j', pass: '1111'});
var deleteDB = require('./delete-db.js');
var saveNode = require('./save-node.js');
var saveRelationship = require('./save-relationship.js');

const label = {
  plhebotomist: 'Plhebotomist',
  patient: 'Patient'
};

var armando = { name: "Armando", age: 30 };
var saveArmando = saveNode.bind(undefined, armando, label.plhebotomist);
var bela = { name: "Bela", age: 41 };
var saveBela = saveNode.bind(undefined, bela, label.patient);

// delete db, create 2 nodes and create a 'Nearby' relationship
deleteDB().then(doStuff);

function doStuff() {
  Promise.all([saveArmando(), saveBela()]).then(relateThem);

  function relateThem(nodes) {
    saveRelationship('Nearby', nodes[0], nodes[1]).then(done).catch(error);
  }
}

function done(res) {
}

function error(err) {
  console.error('error:', err);
}

