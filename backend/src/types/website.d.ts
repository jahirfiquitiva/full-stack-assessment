import type { Link } from './link';

export interface Website {
  id: string;
  title: string;
  links: Array<Link>;
}
