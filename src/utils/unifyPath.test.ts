import { describe, expect, it } from 'vitest';

import { unifyPath } from '@/utils/unifyPath';

describe('unifyPath', () => {
  it('adds a leading slash', () => {
    expect(unifyPath('posts/foo')).toBe('/posts/foo');
  });

  it('strips a trailing slash', () => {
    expect(unifyPath('/2016/03/17/less-but-better/')).toBe(
      '/2016/03/17/less-but-better'
    );
  });

  it('keeps an already-normalized path unchanged', () => {
    expect(unifyPath('/posts/foo')).toBe('/posts/foo');
  });
});
