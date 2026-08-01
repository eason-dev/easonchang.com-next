// Legacy posts title code fences with rehype-code-titles syntax
// (```js:src/file.js). rehype-pretty-code expects ```js title="src/file.js".
// This shim rewrites the former into the latter so both keep working.
import { visit } from 'unist-util-visit';

type CodeNode = {
  type: 'code';
  lang?: string | null;
  meta?: string | null;
};

export default function remarkCodeTitleShim() {
  return (tree: Parameters<typeof visit>[0]) => {
    visit(tree, 'code', (node) => {
      const code = node as unknown as CodeNode;
      if (!code.lang?.includes(':')) return;

      const [lang, ...titleParts] = code.lang.split(':');
      const title = titleParts.join(':');
      if (!title) return;

      code.lang = lang;
      code.meta = [`title="${title}"`, code.meta].filter(Boolean).join(' ');
    });
  };
}
