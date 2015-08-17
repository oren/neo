'use strict';

require('./env.js');
var cypher = require('./cypher.js');

createTravelers();

function createTravelers() {
  var statements = [
    {
      'statement' : `
      CREATE CONSTRAINT ON (t:Traveler)
      ASSERT t.email IS UNIQUE;
      `
    }
  ];

  cypher(statements, done);

  var statements = [
    {
      'statement' : 'CREATE (t:Traveler { props })',
      parameters: {
        props: [
          {name: 'Josh', email: 'josh@test.com'},
          {name: 'Matt', email: 'matt@test.com'},
          {name: 'Ari', email: 'ari@test.com'}
        ]
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

  console.log(data);
}
