import clsx from 'clsx';

import Bluesky from './bluesky.svg';
import Facebook from './facebook.svg';
import Github from './github.svg';
import Instagram from './instagram.svg';
import Linkedin from './linkedin.svg';
import Mail from './mail.svg';
import RSS from './rss.svg';
import Threads from './threads.svg';
import Twitter from './twitter.svg';
import Youtube from './youtube.svg';

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  threads: Threads,
  instagram: Instagram,
  bluesky: Bluesky,
  rss: RSS,
};

// Brand-coloured hover states, keyed by kind. Written as whole class strings so
// Tailwind's scanner can see them.
const hoverColors: Record<keyof typeof components, string> = {
  mail: 'hover:text-primary-600 dark:hover:text-primary-400',
  github: 'hover:text-gray-500 dark:hover:text-gray-400',
  facebook: 'hover:text-[#4267B2] dark:hover:text-[#4267B2]',
  youtube: 'hover:text-[#FF0000] dark:hover:text-[#FF0000]',
  linkedin: 'hover:text-[#0e76a8] dark:hover:text-[#0e76a8]',
  twitter: 'hover:text-[#1DA1F2] dark:hover:text-[#1DA1F2]',
  threads: 'hover:text-black dark:hover:text-white',
  instagram: 'hover:text-[#E4405F] dark:hover:text-[#E4405F]',
  bluesky: 'hover:text-[#0285FF] dark:hover:text-[#0285FF]',
  rss: 'hover:text-[#FFA500] dark:hover:text-[#FFA500]',
};

type Props = {
  kind: keyof typeof components;
  href: string;
};

const SocialIcon = ({ kind, href }: Props) => {
  if (
    !href ||
    (kind === 'mail' &&
      !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null;

  const SocialSvg = components[kind];

  return (
    <a
      className="text-sm text-gray-500 transition-colors hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={clsx(
          `h-6 w-6 fill-current text-gray-700 transition-colors dark:text-gray-200`,
          hoverColors[kind]
        )}
      />
    </a>
  );
};

export default SocialIcon;
