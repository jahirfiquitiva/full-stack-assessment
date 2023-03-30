export interface Link {
  title: string;
  url: string;
}

export interface Website {
  id?: string;
  title?: string;
  url: string;
  links: Array<Link>;
  linksCount: number;
}
