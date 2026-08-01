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

type Props = {
  title: string;
  detail: string;
  cta: string;
  href: string;
  chips: string[];
};

const SPRING = { stiffness: 160, damping: 18, mass: 0.6 };

/**
 * Pointer-tracking 3D tilt card with a glare highlight that follows the
 * cursor. The whole card is a link (used to promote Aburi Studio's
 * build-in-public work). Falls back to a static card when the user prefers
 * reduced motion. The card is hand-rolled instead of using `bento-card`
 * because that utility sets `overflow: hidden`, which flattens the
 * `preserve-3d` depth of the floating chips.
 */
export default function TiltCard({ title, detail, cta, href, chips }: Props) {
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(pointerY, [0, 1], [9, -9]), SPRING);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-11, 11]), SPRING);

  const glareX = useTransform(pointerX, (value) => `${value * 100}%`);
  const glareY = useTransform(pointerY, (value) => `${value * 100}%`);
  const glare = useMotionTemplate`radial-gradient(360px circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.09), transparent 70%)`;

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
        className="mt-1 flex flex-wrap content-start gap-2"
        style={reduceMotion ? undefined : { transform: 'translateZ(40px)' }}
      >
        {chips.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-gray-900/10 bg-white/70 px-3 py-1 text-sm font-medium text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
          >
            {chip}
          </li>
        ))}
      </ul>
      <p
        className="mt-auto pt-4 text-sm font-medium text-primary-600 dark:text-primary-400"
        style={reduceMotion ? undefined : { transform: 'translateZ(20px)' }}
      >
        {cta}
      </p>
    </>
  );

  const cardClassName =
    'relative flex h-full flex-col gap-4 rounded-3xl border border-gray-900/10 bg-gradient-to-b from-white/80 to-white/55 p-8 shadow-sm transition-colors hover:border-primary-500/30 dark:border-white/10 dark:from-gray-900/70 dark:to-gray-900/45';

  if (reduceMotion) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cardClassName}>
        {content}
      </a>
    );
  }

  return (
    <div
      className="h-full [perspective:1000px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={cardClassName}
      >
        <motion.div
          aria-hidden="true"
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
        {content}
      </motion.a>
    </div>
  );
}
