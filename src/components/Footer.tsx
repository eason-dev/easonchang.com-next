import SocialIcon from '@/components/atoms/SocialIcon';
import CustomLink from '@/components/CustomLink';
import siteMetadata from '@/data/siteMetadata';

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        {/* Same set of places to find me as the About page's "Let's talk!" list */}
        <div className="mb-3 flex flex-wrap justify-center gap-x-4 gap-y-3">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
          <SocialIcon kind="github" href={siteMetadata.github} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} />
          <SocialIcon kind="threads" href={siteMetadata.threads} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} />
          <SocialIcon kind="bluesky" href={siteMetadata.bluesky} />
          <SocialIcon
            kind="rss"
            href={siteMetadata.siteUrl + siteMetadata.rss}
          />
        </div>
        <div className="mb-8 flex space-x-2 text-sm text-gray-500 transition-colors dark:text-gray-400">
          <div>{`Copyright © 2015 - ${new Date().getFullYear()}`}</div>
          <CustomLink href="/">{siteMetadata.author}</CustomLink>
        </div>
      </div>
    </footer>
  );
}
