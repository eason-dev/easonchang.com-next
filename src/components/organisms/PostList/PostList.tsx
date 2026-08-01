'use client';

import PostCard, { type PostForPostList } from './PostCard';

export type { PostForPostList };

type Props = {
  posts: PostForPostList[];
};

export default function PostList({ posts = [] }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-4 py-6">
      {!posts.length && 'No posts found.'}
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
