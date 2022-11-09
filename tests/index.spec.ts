import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { CreateUserCommand } from '../src/event-bus/create-user-command';
import { createUser } from '../src/event-bus/create-user-handler';
import { session } from '../src/neo4j';
import { expect } from 'chai';

describe('Test createUserHandler', () => {
  it('should return a user', async () => {
    const userCreationParams = { name: 'Jonas', email: 'joao@email.com', password: 'password' };
    const command = new CreateUserCommand(userCreationParams);

    await createUser(command);
    await createUser(command);

    const result = await session.run(`MATCH (user:USER) RETURN user`);
    const singleRecord = result.records[0];
    const node = singleRecord.get(0);
    // const node2 = singleRecord.get(1);
    console.log(singleRecord);
    console.log(node);
    // console.log(node2);

    // expect(node.labels[0]).to.be.deep.eq('USER');
    // expect(node.properties).to.be.deep.eq(userCreationParams);
  });
});
