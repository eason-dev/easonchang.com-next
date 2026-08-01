'use client';

import { useTranslations } from 'next-intl';

import ProjectCard from '@/components/organisms/ProjectCard';
import type { Project } from '@/data/projects';

export default function ProjectLayout({ projects }: { projects: Project[] }) {
  const t = useTranslations('common');

  return (
    <div className="divide-y divide-gray-200 transition-colors dark:divide-gray-700">
      <div className="space-y-2 py-10 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 transition-colors dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('projects')}
        </h1>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
