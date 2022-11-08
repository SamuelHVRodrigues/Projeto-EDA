import { handlerFor } from '@node-ts/bus-core';
import { session } from '../neo4j';
import { CreateUserCommand } from './create-user-command';

export const createUserHandler = handlerFor(CreateUserCommand, async (command) => {
  await session.run(`CREATE (user:USER {name: $name, email: $email, password: $password})`, {
    name: command.userCreationParams.name,
    email: command.userCreationParams.email,
    password: command.userCreationParams.password,
  });
});
