type Props = {
  title: string;
  detail: string;
  cta: string;
  href: string;
  chips: string[];
};

/**
 * Simple linked promo card (used for Aburi Studio's build-in-public work).
 * Same quiet bento treatment as every other card — no special effects.
 */
export default function PromoCard({ title, detail, cta, href, chips }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="bento-card flex h-full flex-col gap-4 p-8"
    >
      <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300">{detail}</p>
      <ul className="mt-1 flex flex-wrap content-start gap-2">
        {chips.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-gray-900/10 bg-white/70 px-3 py-1 text-sm font-medium text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
          >
            {chip}
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-4 text-sm font-medium text-primary-600 dark:text-primary-400">
        {cta}
      </p>
    </a>
  );
}
