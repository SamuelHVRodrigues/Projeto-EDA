import { handlerFor } from '@node-ts/bus-core';
import { session } from '../../neo4j';
import { CreateUserCommand } from './create-user-command';

export const createUserHandler = handlerFor(CreateUserCommand, createUser);

export async function createUser(command) {
  await session.run(
    `CREATE (user:USER {id: randomUUID(), name: $input.name, email: $input.email, password: $input.password})`,
    { input: command.userCreationParams },
  );
}
