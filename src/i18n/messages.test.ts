import { describe, expect, it } from 'vitest';

import en from '../../messages/en.json';
import zhTW from '../../messages/zh-TW.json';

type Messages = Record<string, unknown>;

const flattenKeys = (messages: Messages, prefix = ''): string[] =>
  Object.entries(messages).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === 'object' && value !== null
      ? flattenKeys(value as Messages, path)
      : [path];
  });

// UI strings live in messages/{en,zh-TW}.json — every key must exist in BOTH
// files (see CLAUDE.md), or one locale renders a missing-translation error.
describe('messages', () => {
  it('en and zh-TW define the same keys', () => {
    expect(flattenKeys(en as Messages).sort()).toEqual(
      flattenKeys(zhTW as Messages).sort()
    );
  });
});
