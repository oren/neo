'use strict';

require('./env.js');
var cypher = require('./cypher.js');

var params = [];
var query = '';

createAirPorts();
createTravelers();
createFlights();

function createAirPorts() {
  var airports = [
    {code: 'ATL', city: 'Atlanta'},
    {code: 'ORD', city: 'Chicago'},
    {code: 'LAX', city: 'Los Angeles'},
    {code: 'DFW', city: 'Dallas-Fort Worth'},
    {code: 'DEN', city: 'Denver'},
    {code: 'JFK', city: 'New York'},
    {code: 'SFO', city: 'San Francisco'},
    {code: 'LGA', city: 'New York'},
    {code: 'PEK', city: 'Beijing'},
    {code: 'LHR', city: 'London'},
    {code: 'HND', city: 'Jokyo'}
  ];

  airports.forEach(function (airport) {
    relate(airport.code, airport.city);
  });

  function relate(airport, city) {
    query = `
      CREATE (a:Airport {code: '${airport}'}), (c:City {name: '${city}'}),
      (a)-[:IN]->(c)
    `;
    cypher(query, params, done);
  }
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

function done(err, data) {
  if (err) {
    console.error('Error in query', err);
    return;
  }

  console.log(JSON.stringify(data));
}
