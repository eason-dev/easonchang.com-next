'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import CustomLink from '@/components/CustomLink';
import type { Project } from '@/data/projects';

type Props = {
  project: Project;
};

const pillClassName =
  'rounded-full border border-gray-900/10 px-3.5 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:border-primary-500/30 hover:text-primary-600 dark:border-white/10 dark:text-gray-300 dark:hover:text-primary-400';

export default function ProjectCard({ project }: Props) {
  const {
    title,
    description,
    links: { post, github, site },
    image: { src: imgSrc, alt: imgAlt, placeholder: imgPlaceholder },
  } = project;
  const t = useTranslations('common');
  const href = post || site || github;

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
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 344px, 472px"
        />
      </CustomLink>
      <div className="flex grow flex-col p-6 sm:p-7">
        <h2 className="text-xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
          <CustomLink
            href={href}
            aria-label={`Link to ${title}`}
            className="transition-colors hover:text-primary-600 dark:hover:text-primary-400"
          >
            {title}
          </CustomLink>
        </h2>
        <div
          className="prose prose-sm mt-3 max-w-none text-gray-500 transition-colors dark:prose-invert dark:text-gray-400"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: descriptions are trusted local data
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {post && (
            <CustomLink href={post} className={pillClassName}>
              {t('learn-more')} &rarr;
            </CustomLink>
          )}
          {site && (
            <a
              href={site}
              target="_blank"
              rel="noreferrer"
              className={pillClassName}
            >
              {t('visit-site')} ↗
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className={pillClassName}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
