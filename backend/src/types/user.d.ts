import type { Document } from 'mongoose';

export interface User {
  id: string;
  username: string;
}

export type UserDocument = Omit<Document, '_id'> & User;
