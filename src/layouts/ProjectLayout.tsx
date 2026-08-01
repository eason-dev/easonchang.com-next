'use client';

import { useTranslations } from 'next-intl';

import FadeIn from '@/components/FadeIn';
import ProjectCard from '@/components/organisms/ProjectCard';
import type { Project, ProjectCategory } from '@/data/projects';

const SECTION_ORDER: Exclude<ProjectCategory, 'aburi'>[] = [
  'side',
  'work',
  'maker',
];

export default function ProjectLayout({ projects }: { projects: Project[] }) {
  const t = useTranslations('common');
  const tp = useTranslations('projectsPage');

  const aburiProjects = projects.filter((p) => p.category === 'aburi');
  const sections = SECTION_ORDER.map((category) => ({
    category,
    items: projects.filter((p) => p.category === category),
  })).filter((section) => section.items.length > 0);

  return (
    <div className="divide-y divide-gray-900/5 dark:divide-white/5">
      <div className="space-y-2 py-10 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 transition-colors dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('projects')}
        </h1>
      </div>

      {/* Featured: Aburi Studio products */}
      {aburiProjects.length > 0 && (
        <section className="py-10">
          <FadeIn>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                {tp('aburi-title')}
              </h2>
              <a
                href="https://aburistudio.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-500 dark:text-primary-400"
              >
                aburistudio.com ↗
              </a>
            </div>
            <p className="mt-2 max-w-2xl text-gray-500 dark:text-gray-400">
              {tp('aburi-blurb')}
            </p>
          </FadeIn>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {aburiProjects.map((project, index) => (
              <FadeIn key={project.title} delay={Math.min(index, 3) * 0.05}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* Everything else, grouped and quieter */}
      {sections.map(({ category, items }) => (
        <section key={category} className="py-10">
          <FadeIn>
            <h2 className="text-xl font-bold tracking-tight text-gray-700 dark:text-gray-300">
              {tp(`${category}-title`)}
            </h2>
          </FadeIn>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((project, index) => (
              <FadeIn key={project.title} delay={Math.min(index, 3) * 0.05}>
                <ProjectCard project={project} variant="compact" />
              </FadeIn>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
