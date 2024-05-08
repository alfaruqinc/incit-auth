import { Request } from 'express';
import { User } from '../users/users.schema';

export interface RequestWithUser extends Request {
  user: User;
}
