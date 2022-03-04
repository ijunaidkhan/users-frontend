import { User } from './user.model';

export interface UserList {
  totalCount: number;
  data: User[]
}
