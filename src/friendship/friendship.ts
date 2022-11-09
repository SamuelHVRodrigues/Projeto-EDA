export interface Friendship {
  userId1: string;
  userId2: string;
}

export type FriendshipCreationParams = Pick<Friendship, 'userId1' | 'userId2'>;
