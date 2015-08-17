'use strict';

require('./env.js');
var cypher = require('./cypher.js');

createAirPorts();

function createAirPorts() {
  var statements = [];
  var props = [];
  var cityProps = [];

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
    props.push({code: airport.code});
    cityProps.push({name: airport.city});
  });

  statements = [
    {
      'statement' : `CREATE (a:Airport { props }), (c:City { cityProps }), (a)-[:IN]->(c)`,
      parameters: {props: props, cityProps}
    }
  ];

  console.log('statement', statements[0].statement);
  console.log('parameters', statements[0].parameters);

  statements = [{
    'statement': 'CREATE (a:Airport { props }), (c:City { cityProps }), (a)-[:IN]->(c)',
    'parameters': {
      props:[
        { code: 'ATL' },
        { code: 'ORD' },
        { code: 'LAX' },
        { code: 'DFW' },
        { code: 'DEN' },
        { code: 'JFK' },
        { code: 'SFO' },
        { code: 'LGA' }
      ],
      cityProps: [
        { name: 'Atlanta' },
        { name: 'Chicago' },
        { name: 'Los Angeles' },
        { name: 'Dallas-Fort Worth' },
        { name: 'Denver' },
        { name: 'New York' },
        { name: 'San Francisco' },
        { name: 'New York' }
      ]
    }
  }];

  cypher(statements, done);
}

function done(err, data) {
  if (err || data.errors.length) {
    console.error('Error in query:', data.errors[0].message);
    return;
  }

  console.log(data);
}
