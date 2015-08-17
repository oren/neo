require('./env.js');
var cypher = require("./cypher.js");

var params = [];
var query = '';

query = `
  CREATE CONSTRAINT ON (t:Traveler)
  ASSERT t.email IS UNIQUE;
`;
cypher(query, params, done)

query = `CREATE
  (t1:Traveler {name: 'Josh'}),
  (t2:Traveler {name: 'Matt'})
`;
cypher(query, params, done);

query = `CREATE (t:Traveler {name: 'Meg'})`;
cypher(query, params, done);

query = `CREATE (t:Traveler { props })`;
param = [
  {name:"Josh"},
  {name:"Matt"},
  {name:"Ari"}
];
cypher(query, param, done);

function done(err,data) {
  if (err) {
    console.error('Error in query', err);
    return;
  }

  console.log(JSON.stringify(data))
}
