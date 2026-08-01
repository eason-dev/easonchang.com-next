import { allPages, allPosts } from 'content-collections';

import { unifyPath } from '@/utils/unifyPath';

export type Post = (typeof allPosts)[number];
export type Page = (typeof allPages)[number];

export { allPages, allPosts };

const byDateNewToOld = (a: Post, b: Post) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

export const allPostsNewToOld: Post[] = [...allPosts].sort(byDateNewToOld);

export const allPostsOfLocaleNewToOld = (locale: string): Post[] =>
  allPostsNewToOld.filter((post) => post.language === locale);

export type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

const collectRedirects = (): Redirect[] => {
  const redirects: Redirect[] = [];

  allPosts.forEach((post) => {
    const sources = (post.redirect_from ?? []).map(unifyPath);
    // Old filename-based URLs (e.g. /posts/2016-03-17-less-but-better) keep working.
    sources.push(unifyPath('/posts/' + post.sourceFileName.replace(/\.mdx?$/, '')));
    sources.forEach((source) => {
      redirects.push({ source, destination: post.path, permanent: false });
    });
  });

  allPages.forEach((page) => {
    (page.redirect_from ?? []).map(unifyPath).forEach((source) => {
      redirects.push({ source, destination: page.path, permanent: false });
    });
  });

  return redirects;
};

export const allRedirects: Redirect[] = collectRedirects();

export const findRedirect = (path: string): Redirect | undefined =>
  allRedirects.find((rule) => rule.source === unifyPath(path));
