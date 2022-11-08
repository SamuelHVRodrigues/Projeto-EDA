import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  process.env.NEO4J_URL,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
);
const session = driver.session();

export async function test() {
  try {
    const result = await session.run(`CREATE (user:USER {name: "Jane Doe"}) RETURN user`);
    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    console.log(node.properties.name);
  } finally {
    await session.close();
  }

  await driver.close();
}
