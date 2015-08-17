'use strict';

require('./env.js');
var cypher = require('./cypher.js');

createAirPorts();

function createAirPorts() {
  var statements = [];
  var statement = {};

  var airports = [
    {code: 'ATL', city: 'Atlanta'},
    {code: 'ORD', city: 'Chicago'},
    {code: 'LAX', city: 'Los Angeles'},
    {code: 'DFW', city: 'Dallas-Fort Worth'},
    {code: 'DEN', city: 'Denver'},
    {code: 'JFK', city: 'New York'},
    {code: 'SFO', city: 'San Francisco'},
    {code: 'LGA', city: 'New York'}
  ];

  airports.forEach(function (airport) {
    statement = {
      'statement' : `
        CREATE (a:Airport { props }), (c:City { cityProps }),
        (a)-[:IN]->(c)
      `,
      parameters: {
        props: {code: airport.code},
        cityProps: {name: airport.city}
      }
    };

    statements.push(statement);
  });

  cypher(statements, done);
}

function done(err, data) {
  if (err || data.errors.length) {
    console.error('Error in query:', data.errors[0].message);
    return;
  }

  console.log(data);
}
