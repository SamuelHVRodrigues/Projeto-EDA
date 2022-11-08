export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type UserCreationParams = Pick<User, 'email' | 'name' | 'password'>;
