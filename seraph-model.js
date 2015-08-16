// example of using seraph-model.
//
// it's an NPM package that makes it easy to to deal with your domain models.
// it has helper functions for creating and searching models and also assigning schema with validations to a model.

var db = require("seraph")({server: "http://localhost:7474", user: 'neo4j', pass: '1111'});
var model = require('seraph-model');
var deleteDB = require('./delete-db.js');
var relate = require('./relate.js');

var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

const label = {
  plhebotomist: 'Plhebotomist',
  patient: 'Patient'
};

var patient = model(db, label.patient);
var plhebotomist = model(db, label.plhebotomist);

plhebotomist.setUniqueKey('email');

plhebotomist.schema = {
  email: {type: String, match: emailRegex, required: true},
  name: {type: String, required: true},
  rating: {type: Number, min: 1, max: 10, default: 5},
  dob: {type: Date, required: true}
}

var armando = {
  email: 'foo@test.com',
  name: 'Armando',
  dob: new Date('1984-02-26'),
  city: 'Los Angeles'
}

deleteDB().then(doStuff);

function doStuff() {
  Promise.all([saveArmando(), saveBela()]).then(relateThem).catch(error);

  function saveArmando() {
    return new Promise(function(resolve, reject){
      plhebotomist.save(armando, function(err, node) {
        if (err) {
          return reject(err);
        }

        console.log('node saved:', node);
        return resolve(node);
      })
    });
  }

  function saveBela() {
    return new Promise(function(resolve, reject){
      patient.save({name: 'Bela', city: 'Los Angeles'}, function(err, node) {
        if (err) {
          return reject(err);
        }

        console.log('node saved:', node);
        return resolve(node);
      })
    });
  }

  function relateThem(nodes) {
    relate('Nearby', nodes[0], nodes[1]).then(done).catch(error);
  }

  function done(res) {
  }

  function error(err) {
    console.error('error:', err);
  }
}
