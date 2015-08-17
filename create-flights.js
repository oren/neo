'use strict';

require('./env.js');
var request = require("request");
var host = process.env.HOST;
var port = process.env.PORT;
var username = process.env.USER;
var password = process.env.PASS;
var url = `http://${username}:${password}@${host}:${port}/db/data/transaction/commit`;
// var cypher2 = require('./cypher2.js');

var params = [];
var query = '';

createFlight();

function createFlight(email, flight) {
  findTraveler(email).then(createFl).catch(error);

  function findTraveler(email) {
    var query = `MATCH (t:Traveler) WHERE t.name="Matt" RETURN t`;
    return new Promise(function(resolve, reject) {
      // return cypher2(query, {});
      request.post({
        uri: url,
        json: {statements: [{statement: query, parameters: {'props': params}}]}
      }, function(err, res) {
        console.log('err', err);
        console.log('res.body', res.body);
        return resolve(res.body)
        //TODO: reject
      })
    });
  }

  function createFl(res) {
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
