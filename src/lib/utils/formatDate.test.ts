import { describe, expect, it } from 'vitest';

import formatDate from '@/lib/utils/formatDate';

describe('formatDate', () => {
  it('formats English dates', () => {
    expect(formatDate('2024-03-02T00:00:00.000Z', 'en')).toBe('March 2, 2024');
  });

  it('formats zh-TW dates', () => {
    expect(formatDate('2024-03-02T00:00:00.000Z', 'zh-TW')).toBe(
      '2024年3月2日'
    );
  });
});
