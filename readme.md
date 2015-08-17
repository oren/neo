# Neo4j, Node.js

## Run the Database

```
mkdir -p /var/lib/neo4j/data
docker run -i -t -d --name neo4j --cap-add=SYS_RESOURCE -v /var/lib/neo4j/data:/var/lib/neo4j/data -p 7474:7474 -e NEO4J_AUTH=neo4j:1111 tpires/neo4j
```
http://localhost:7474 password: 1111


## Run examples

    npm install
    node index.js

## Web interface commands

**view the entire db**

    MATCH (n)
    RETURN n
