'use strict';

require('./env.js');
var cypher = require('./cypher.js');
// var cypher2 = require('./cypher2.js');

var params = [];
var query = '';

createTravelers();
// createFlight();

function createTravelers() {
  query = `
    CREATE CONSTRAINT ON (t:Traveler)
    ASSERT t.email IS UNIQUE;
  `;
  cypher(query, params, done);

  query = `CREATE
    (t1:Traveler {name: 'Josh'}),
    (t2:Traveler {name: 'Matt'})
  `;
  cypher(query, params, done);

  query = `CREATE (t:Traveler {name: 'Meg'})`;
  cypher(query, params, done);

  query = `CREATE (t:Traveler { props })`;
  params = [
    {name: 'Josh', email: 'josh@test.com'},
    {name: 'Matt', email: 'matt@test.com'},
    {name: 'Ari', email: 'ari@test.com'}
  ];
  cypher(query, params, done);
}

function createFlight(email, flight) {
  findTraveler(email).then(createFlight).catch(error);

  function findTraveler(email) {
    var query = `MATCH (t:Traveler) WHERE t.name="Matt" RETURN t`;
    return new Promise(function(reolve, reject) {
      cypher2(query, {});
    });
  }

  function createFlight(res) {
    console.log('createFlight', res);
    // query = `
    //   CREATE (t:Tra {code: '${airport}'}), (c:City {name: '${city}'}),
    //   (a)-[:IN]->(c)
    // `;
    // cypher(query, params, done);
  }

  function error(err) {
    console.error('error in query', err);
  }
}

function done(err, data) {
  if (err) {
    console.error('Error in query', err);
    return;
  }

  console.log(JSON.stringify(data));
}
