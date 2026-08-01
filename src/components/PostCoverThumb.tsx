import Image from 'next/image';

/* Cover fallback for posts without a socialImage: a deterministic gradient
 * poster keyed off the slug, with a monogram watermark. Full literal class
 * names so Tailwind sees them. */
const POSTER_GRADIENTS = [
  'from-teal-400 via-cyan-500 to-sky-600',
  'from-violet-400 via-purple-500 to-fuchsia-600',
  'from-amber-400 via-orange-500 to-rose-500',
  'from-emerald-400 via-teal-500 to-cyan-600',
  'from-sky-400 via-blue-500 to-indigo-600',
  'from-pink-400 via-rose-500 to-red-500',
];

const posterGradient = (slug: string) => {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return POSTER_GRADIENTS[hash % POSTER_GRADIENTS.length];
};

type Props = {
  slug: string;
  title: string;
  image?: string;
  sizes?: string;
  monogramClassName?: string;
};

/**
 * Post cover preview for listing rows/cards. Renders the post's socialImage
 * when available, otherwise the gradient-poster fallback. Must be placed
 * inside a `relative` container; scales on `group` hover.
 */
export default function PostCoverThumb({
  slug,
  title,
  image,
  sizes = '176px',
  monogramClassName = 'text-5xl',
}: Props) {
  if (image) {
    return (
      <Image
        src={image}
        alt=""
        fill
        unoptimized
        sizes={sizes}
        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 bg-gradient-to-br transition-transform duration-500 motion-safe:group-hover:scale-105 ${posterGradient(slug)}`}
    >
      <span
        className={`absolute -bottom-3 -right-1 select-none font-black leading-none text-white/25 ${monogramClassName}`}
      >
        {title.slice(0, 1)}
      </span>
    </div>
  );
}
