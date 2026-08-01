'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import PostList from '@/components/organisms/PostList';
import type { PostForPostList } from '@/components/organisms/PostList/PostList';
import Pagination, { type PaginationType } from '@/components/Pagination';

type Props = {
  posts: PostForPostList[];
  initialDisplayPosts: PostForPostList[];
  pagination: PaginationType;
};

export default function ListLayout({
  posts,
  initialDisplayPosts = [],
  pagination,
}: Props) {
  const t = useTranslations('common');

  const [searchValue, setSearchValue] = useState('');

  const filteredBlogPosts = searchValue
    ? posts.filter((post) => {
        const searchContent = post.title + post.description;
        return searchContent.toLowerCase().includes(searchValue.toLowerCase());
      })
    : initialDisplayPosts;

  return (
    <>
      <div className="divide-y">
        <div className="space-y-2 pt-10 pb-6 md:space-y-5">
          <h1 className="pb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 transition-colors dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('all-posts')}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label={t('post-search-placeholder')}
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t('post-search-placeholder')}
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-colors focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              aria-hidden="true"
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 transition-colors dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <PostList posts={filteredBlogPosts} />
      </div>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  );
}
