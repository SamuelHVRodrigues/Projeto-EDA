import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  process.env.NEO4J_URL,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
);
export const session = driver.session({ database: process.env.NEO4J_DATABASE });
