import { createPaginableContext } from './../providers';
import type { Website, Link } from './../types/website';

export const WebsitesPaginableContext = createPaginableContext<Website>();
export const LinksPaginableContext = createPaginableContext<Link>();
