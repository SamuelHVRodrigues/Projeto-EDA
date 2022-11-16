import * as dotenv from 'dotenv';
dotenv.config({ path: './test.env' });
import { CreateUserCommand } from '../src/event-bus/create-user/create-user-command';
import { createUser } from '../src/event-bus/create-user/create-user-handler';
import { session } from '../src/neo4j';
import chai, { expect } from 'chai';
import chaiExclude from 'chai-exclude';
import { CreateFriendshipCommand } from '../src/event-bus/create-friendship/create-friendship-command';
import { createFriendship } from '../src/event-bus/create-friendship/create-friendship-handler';

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

    const regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    expect(regexUUID.test(node.properties.id)).to.be.true;
    expect(records.length).to.be.deep.eq(1);
    expect(node.labels[0]).to.be.deep.eq('USER');
    expect(node.properties).excluding('id').to.be.deep.eq(userCreationParams);
  });
});

describe('Test createFriendshipHandler', () => {
  beforeEach(async () => {
    await session.run(`CREATE
      (:USER {id: "1", name: "Cosmo", email: "cosmo@email.com", password: "password"}),
      (:USER {id: "2", name: "Wanda", email: "wanda@email.com", password: "pass1234"})`);
  });

  afterEach(async () => {
    await session.run(`MATCH (user:USER) DETACH DELETE user`);
  });

  it('should create a relation between two users', async () => {
    const friendshipCreationParams = { userId1: '1', userId2: '2' };
    const command = new CreateFriendshipCommand(friendshipCreationParams);

    await createFriendship(command);

    const result = await session.run(`MATCH (start:USER) -[rel:FRIENDS_TO]-> (end:USER) RETURN start, end, rel`);
    const records = result.records;
    const startNode = records[0].get(0);
    const endNode = records[0].get(1);
    const relationship = records[0].get(2);

    expect(records.length).to.be.deep.eq(1);
    expect(relationship.type).to.be.deep.eq('FRIENDS_TO');
    expect(relationship.startNodeElementId).to.be.deep.eq(startNode.elementId);
    expect(relationship.endNodeElementId).to.be.deep.eq(endNode.elementId);
  });
});
