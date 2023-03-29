import type { Document, Query } from 'mongoose';

export type MongoQuery<T extends Document> = Query<T | null, T> | null;