import type { Document } from 'mongoose';
import type { Link } from './link';

export interface Website {
  id: string;
  title: string;
  links: Array<Link>;
}

export type WebsiteDocument = Omit<Document, '_id'> & Website;
