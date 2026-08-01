/* Some project descriptions carry rich HTML for the projects page; other
 * surfaces only need a plain-text teaser line. */
const stripHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export default stripHtml;
