import * as dotenv from 'dotenv';
dotenv.config({ path: './test.env' });
import { CreateUserCommand } from '../src/event-bus/create-user-command';
import { createUser } from '../src/event-bus/create-user-handler';
import { session } from '../src/neo4j';
import chai, { expect } from 'chai';
import chaiExclude from 'chai-exclude';

chai.use(chaiExclude);

describe('Test createUserHandler', () => {
  afterEach(async () => {
    await session.run(`MATCH (user:USER) DETACH DELETE user`);
  });

  it('should create a user with the properties send as parameters', async () => {
    const userCreationParams = { name: 'Default', email: 'default@email.com', password: 'password' };
    const command = new CreateUserCommand(userCreationParams);

    await createUser(command);

    const result = await session.run(`MATCH (user:USER) RETURN user`);
    const records = result.records;
    const node = records[0].get(0);

    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    expect(regex.test(node.properties.id)).to.be.true;
    expect(records.length).to.be.deep.eq(1);
    expect(node.labels[0]).to.be.deep.eq('USER');
    expect(node.properties).excluding('id').to.be.deep.eq(userCreationParams);
  });
});
