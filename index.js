'use strict';

require('./env.js');
var cypher = require('./cypher.js');

var params = [];
var query = '';

// createCities();
createAirPorts();
createTravelers();
createFlights();

function createCities() {
  query = `CREATE (c:City { props })`;
  params = [
    {name: 'Atlanta'},
    {name: 'Chicago'},
    {name: 'Los Angeles'},
    {name: 'Dallas-Fort Worth'},
    {name: 'Denver'},
    {name: 'New York'},
    {name: 'San Francisco'}
  ];
  cypher(query, params, done);
}

// CREATE (n)-[:LOVES {since: {value}}]->(m)
// ATL ORD LAX DFW DEN JFK SFO LGA

// CREATE (le:Person {name:"Euler"}),(db:Person {name:"Bernoulli"}),
//   (le)-[:KNOWS {since:1768}]->(db)
// RETURN le, db
function createAirPorts() {
  query = `
    CREATE (a:Airport {code: 'ATL'}), (c:City {name: 'Atlanta'}),
    (a)-[:IN]->(c)
  `
  // params = [
  //   {code: 'ATL'},
  // ];
  cypher(query, params, done);
}

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
    {name: 'Josh'},
    {name: 'Matt'},
    {name: 'Ari'}
  ];
  cypher(query, params, done);
}

function createFlights() {
  query = `CREATE (f:Flight { props })`;
  params = [
    {number: 'LA-232', from: 'LA', to: 'London', date: new Date()},
    {number: 'NY-843',from: 'NY', to: 'Paris', date: new Date()}
  ];
  cypher(query, params, done);
}

function done(err,data) {
  if (err) {
    console.error('Error in query', err);
    return;
  }

  console.log(JSON.stringify(data));
}
