# Neo4j, Node.js, and seraph

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
    node seraph.js         # using seraph without the model package
    node seraph-model.js   # using seraph with the model packages

## Web interface commands

**view the entire db**

    MATCH (n)
    RETURN n
