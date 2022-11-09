import * as dotenv from 'dotenv';
dotenv.config({ path: './test.env' });
import { CreateUserCommand } from '../src/event-bus/create-user-command';
import { createUser } from '../src/event-bus/create-user-handler';
import { session } from '../src/neo4j';
import { expect } from 'chai';

describe('Test createUserHandler', () => {
  it('should return a user', async () => {
    const userCreationParams = { name: 'Default', email: 'default@email.com', password: 'password' };
    const command = new CreateUserCommand(userCreationParams);

    await createUser(command);

    const result = await session.run(`MATCH (user:USER) RETURN user`);
    const records = result.records;
    const node = records[0].get(0);

    expect(records.length).to.be.deep.eq(1);
    expect(node.labels[0]).to.be.deep.eq('USER');
    expect(node.properties).to.be.deep.eq(userCreationParams);

    await session.run(`MATCH (user:USER) DETACH DELETE user`);
  });
});
