'use strict';

require('./env.js');
var cypher = require('./cypher.js');

var email = 'matt@test.com';
var flight = {from: 'LAX', to: 'JFK', time: new Date()};
createFlight(email, flight);

function createFlight(email, flight) {
  // find Traveler
  // create Flight node and Create edge from traveler to flight

  var query = `MATCH (t:Traveler) WHERE t.email="${email}" RETURN ID(t)`;
  cypher(query, done);
}

function done(err, data) {
  if (err || data.errors.length) {
    console.error('Error in query:', data.errors[0].message);
    return;
  }

  console.log(data.results[0].data[0].row[0]);
}

// wrong id
// CREATE (f:Flight {code: 'LA-439'}), (a2:Airport {code: 'JFK'})<-[:TO]-(f)-[:FROM]->(a:Airport {code: 'LAX'}), (t:Traveler {id: 910})-[:CREATED]->(f)

