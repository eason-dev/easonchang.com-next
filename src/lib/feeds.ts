import { Feed } from 'feed';

import siteMetadata from '@/data/siteMetadata';
import { allPostsNewToOld } from '@/lib/content';
import { getPostOGImage } from '@/lib/seo';

export function buildFeed(): Feed {
  const author = {
    name: siteMetadata.author,
    email: siteMetadata.email,
    link: siteMetadata.siteUrl,
  };

  const feed = new Feed({
    title: siteMetadata.title,
    description: siteMetadata.description,
    id: siteMetadata.siteUrl,
    link: siteMetadata.siteUrl,
    image: siteMetadata.siteUrl + siteMetadata.siteLogo,
    favicon: `${siteMetadata.siteUrl}/favicon.ico`,
    copyright: `Copyright © 2015 - ${new Date().getFullYear()} Eason Chang`,
    feedLinks: {
      rss: `${siteMetadata.siteUrl}/feed.xml`,
      json: `${siteMetadata.siteUrl}/feed.json`,
      atom: `${siteMetadata.siteUrl}/atom.xml`,
    },
    author,
  });

  allPostsNewToOld.forEach((post) => {
    feed.addItem({
      id: siteMetadata.siteUrl + post.path,
      title: post.title,
      link: siteMetadata.siteUrl + post.path,
      description: post.description,
      image: getPostOGImage(
        post.socialImage,
        post.title,
        post.description
      ).replace('&', '&amp;'),
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });

  return feed;
}
