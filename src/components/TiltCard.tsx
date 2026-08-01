'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import type { PointerEvent } from 'react';

const STACK = [
  'Next.js 16',
  'React 19',
  'Tailwind CSS 4',
  'TypeScript',
  'MDX',
  'Motion',
];

type Props = {
  title: string;
  detail: string;
  hint: string;
};

const SPRING = { stiffness: 160, damping: 18, mass: 0.6 };

/**
 * Pointer-tracking 3D tilt card with a glare highlight that follows the
 * cursor. Falls back to a static card when the user prefers reduced motion.
 * The card is hand-rolled instead of using `bento-card` because that utility
 * sets `overflow: hidden`, which flattens the `preserve-3d` depth of the
 * floating chips.
 */
export default function TiltCard({ title, detail, hint }: Props) {
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(pointerY, [0, 1], [9, -9]), SPRING);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-11, 11]), SPRING);

  const glareX = useTransform(pointerX, (value) => `${value * 100}%`);
  const glareY = useTransform(pointerY, (value) => `${value * 100}%`);
  const glare = useMotionTemplate`radial-gradient(360px circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.22), transparent 70%)`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const resetPointer = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const content = (
    <>
      <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300">{detail}</p>
      <ul
        className="my-auto flex flex-wrap gap-2 py-4"
        style={reduceMotion ? undefined : { transform: 'translateZ(40px)' }}
      >
        {STACK.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-gray-900/10 bg-white/70 px-3 py-1 text-sm font-medium text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
          >
            {tech}
          </li>
        ))}
      </ul>
      <p
        className="text-sm text-gray-400"
        style={reduceMotion ? undefined : { transform: 'translateZ(20px)' }}
      >
        {hint}
      </p>
    </>
  );

  const cardClassName =
    'relative flex h-full flex-col gap-4 rounded-3xl border border-gray-900/10 bg-white/60 p-8 shadow-sm dark:border-white/10 dark:bg-gray-900/55';

  if (reduceMotion) {
    return <section className={cardClassName}>{content}</section>;
  }

  return (
    <div
      className="h-full [perspective:1000px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.section
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={cardClassName}
      >
        <motion.div
          aria-hidden="true"
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
        {content}
      </motion.section>
    </div>
  );
}
