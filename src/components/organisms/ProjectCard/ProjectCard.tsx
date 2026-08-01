'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import GithubIcon from '@/components/atoms/SocialIcon/github.svg';
import CustomLink from '@/components/CustomLink';
import type { Project } from '@/data/projects';
import stripHtml from '@/lib/utils/stripHtml';

type Props = {
  project: Project;
  /** `featured` is the full card; `compact` is a quieter card for older work. */
  variant?: 'featured' | 'compact';
};

const iconLinkClassName =
  'rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-900/5 hover:text-primary-600 dark:hover:bg-white/5 dark:hover:text-primary-400';

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m-18.432 0A8.959 8.959 0 0 1 3 12c0 .778.099 1.533.284 2.253m0 0A17.919 17.919 0 0 0 12 16.5c3.162 0 6.133-.815 8.716-2.247"
      />
    </svg>
  );
}

export default function ProjectCard({ project, variant = 'featured' }: Props) {
  const {
    title,
    description,
    links: { post, github, site },
    image: { src: imgSrc, alt: imgAlt, placeholder: imgPlaceholder },
  } = project;
  const t = useTranslations('common');
  const href = post || site || github;
  const compact = variant === 'compact';

  return (
    <article className="bento-card flex h-full flex-col">
      <CustomLink
        href={href}
        aria-label={`Link to ${title}`}
        className="group relative block aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800"
      >
        <Image
          alt={imgAlt}
          src={imgSrc}
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          quality={30}
          placeholder={imgPlaceholder}
          fill
          sizes={
            compact
              ? '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 344px'
              : '(max-width: 767px) 100vw, (max-width: 1023px) 344px, 472px'
          }
        />
      </CustomLink>
      <div className={`flex grow flex-col ${compact ? 'p-5' : 'p-6 sm:p-7'}`}>
        <h2
          className={`font-bold tracking-tight text-gray-900 dark:text-gray-100 ${
            compact ? 'text-lg leading-6' : 'text-2xl leading-8'
          }`}
        >
          <CustomLink
            href={href}
            aria-label={`Link to ${title}`}
            className="transition-colors hover:text-primary-600 dark:hover:text-primary-400"
          >
            {title}
          </CustomLink>
        </h2>
        {compact ? (
          <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
            {stripHtml(description)}
          </p>
        ) : (
          <div
            className="prose prose-sm mt-3 max-w-none text-gray-500 transition-colors dark:prose-invert dark:text-gray-400"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: descriptions are trusted local data
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
        <div
          className={`mt-auto flex items-center justify-between ${compact ? 'pt-4' : 'pt-5'}`}
        >
          <div className="-ml-2 flex items-center gap-1">
            {site && (
              <a
                href={site}
                target="_blank"
                rel="noreferrer"
                className={iconLinkClassName}
              >
                <span className="sr-only">{`${title} — website`}</span>
                <GlobeIcon />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className={iconLinkClassName}
              >
                <span className="sr-only">{`${title} — GitHub`}</span>
                <GithubIcon className="h-5 w-5 fill-current" />
              </a>
            )}
          </div>
          {post && (
            <CustomLink
              href={post}
              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors hover:text-primary-500 dark:text-primary-400"
            >
              {t('learn-more')}
              <span
                aria-hidden="true"
                className="transition-transform motion-safe:group-hover/link:translate-x-0.5"
              >
                &rarr;
              </span>
            </CustomLink>
          )}
        </div>
      </div>
    </article>
  );
}
