# Neo4j using docker and node.js

I use the following NPM packages:

* [Seraph](https://github.com/brikteknologier/seraph) - a few helper functions on top of Neo4j's REST API. A few example - `db.save(node)`, `db.find(node)`, and `db.query(cypher)`
* [Seraph](https://github.com/brikteknologier/seraph-model) - thin model layer for seraph

## Run the Database

```
mkdir -p /var/lib/neo4j/data
docker run -i -t -d --name neo4j --cap-add=SYS_RESOURCE -v /var/lib/neo4j/data:/var/lib/neo4j/data -p 7474:7474 -e NEO4J_AUTH=neo4j:1111 tpires/neo4j
```
http://localhost:7474 password: 1111


## Run examples

    npm install
    node seraph.js
    node seraph-model.js
    node delete-db.js

## Web interface commands

** view all db **

    MATCH (n)
    RETURN n
