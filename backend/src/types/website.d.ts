import type { Document } from 'mongoose';

export interface Link {
  title: string;
  url: string;
}

export interface Website {
  id: string;
  title: string;
  url: string;
  links: Array<Link>;
  users: Array<string>;
}

export type WebsiteDocument = Omit<Document, '_id'> & Website;
