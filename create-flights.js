// pass the traveler id is a paramere to this script
'use strict';

require('./env.js');
var cypher = require('./cypher.js');

var email = 'matt@test.com';
var flight = {from: 'LAX', to: 'JFK', time: new Date()};
createFlight(email, flight);

function createFlight(email, flight) {
  // find Traveler
  // create Flight node and Create edge from traveler to flight

  var statements = [
    {
      'statement' : `MATCH (t:Traveler) WHERE ID(t) = {travelerId} CREATE (f:Flight {code: 'LA-439'}), (a2:Airport {code: 'JFK'})<-[:TO]-(f)-[:FROM]->(a:Airport {code: 'LAX'}), (t)-[:CREATED]->(f)`,
      parameters: {
        travelerId: parseInt(process.argv[2], 10)
      }
    }
  ];

  cypher(statements, done);
}

function done(err, data) {
  if (err || data.errors.length) {
    console.error('Error in query:', data.errors[0].message);
    return;
  }

  // console.log(data.results[0].data[0].row[0]);
  console.log(data);
}

// 'statement' : `MATCH (t:Traveler) WHERE ID(t) = {travelerId} CREATE (f:Flight {code: 'LA-439'}), (a2:Airport {code: 'JFK'})<-[:TO]-(f)-[:FROM]->(a:Airport {code: 'LAX'}), (t)-[:CREATED]->(f)`,
      // parameters: {
      //   travelerId: 1047
      // }
