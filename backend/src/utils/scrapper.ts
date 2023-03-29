import fetch from 'node-fetch';
import jsdom from 'jsdom';
import type { Link, Website } from 'types';

const { JSDOM } = jsdom;

const fetchWebsiteHtml = async (url: string): Promise<string | undefined> => {
  const response = await fetch(new URL(url));
  return response.text();
};

const transformHtmlToDom = (html: string): Document => {
  const { window } = new JSDOM(html);
  const { document } = window;
  return document;
};

export const scrapeWebsite = async (
  url: string,
): Promise<Pick<Website, 'title' | 'links' | 'linksCount'> | undefined> => {
  const websiteHtml = await fetchWebsiteHtml(url);
  if (!websiteHtml) return undefined;

  const document = transformHtmlToDom(websiteHtml);

  let title: string = document.title;
  if (!title) {
    title = document.querySelector('title')?.innerHTML || 'Unknown';
  }

  const links: Array<Link> = [];
  document.querySelectorAll('a').forEach((element) => {
    if (element.href) {
      links.push({
        url: element.href,
        title: element.innerText || element.innerHTML,
      });
    }
  });

  return { title, links, linksCount: links.length };
};
