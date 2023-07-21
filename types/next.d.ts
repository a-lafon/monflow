import { NextApiRequest } from 'next';
import { User } from '@/domain/models/user';

declare module 'next' {
  export interface NextApiRequest {
    user: User;
    accessToken: string;
  }
}