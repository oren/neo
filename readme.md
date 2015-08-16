# Neo4j using docker and node.js

I also use [Seraph](https://github.com/brikteknologier/seraph), an NPM package that provide a few helper functions on top of Neo4j's REST API. A few example - `db.save(node)`, `db.find(node)`, and `db.query(cypher)`

## Run the Database

```
mkdir -p /var/lib/neo4j/data
docker run -i -t -d --name neo4j --cap-add=SYS_RESOURCE -v /var/lib/neo4j/data:/var/lib/neo4j/data -p 7474:7474 -e NEO4J_AUTH=neo4j:1111 tpires/neo4j
```
http://localhost:7474 password: 1111


## Run example

    npm install
    node index.js
