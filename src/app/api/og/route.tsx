import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

const TITLE_LIMIT = 100;
const DESCRIPTION_LIMIT = 130;

// The old Edge runtime couldn't load a Traditional Chinese font (5 MB > 1 MB
// asset limit), so Chinese OG titles rendered as tofu. The Node runtime has no
// such limit.
let fontsPromise: Promise<{ regular: Buffer; bold: Buffer }> | undefined;
const loadFonts = () => {
  fontsPromise ??= (async () => {
    const assetsDir = path.join(process.cwd(), 'src', 'assets');
    const [regular, bold] = await Promise.all([
      readFile(path.join(assetsDir, 'NotoSansTC-Regular.otf')),
      readFile(path.join(assetsDir, 'NotoSansTC-Bold.otf')),
    ]);
    return { regular, bold };
  })();
  return fontsPromise;
};

const truncate = (value: string | null, limit: number) => {
  if (!value) return '';
  return value.length > limit ? `${value.slice(0, limit)}...` : value;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = truncate(searchParams.get('title'), TITLE_LIMIT);
    const description = truncate(searchParams.get('desc'), DESCRIPTION_LIMIT);

    const { regular, bold } = await loadFonts();

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'gray',
            fontFamily: 'Noto Sans TC, sans-serif',
          }}
        >
          <img
            src="https://easonchang.com/og-background.jpg"
            alt=""
            width={1200}
            height={630}
            tw="flex absolute w-full h-full"
          />
          <div tw="bg-white absolute flex flex-col right-0 bottom-0 h-[550px] w-[1100px] rounded-tl-[80px] p-[60px] shadow-2xl">
            <div tw="flex w-full items-center mb-4">
              <img
                src="https://easonchang.com/logo.png"
                alt="Eason Chang"
                width={100}
                height={100}
                tw="flex w-[100px] h-[100px] bg-gray-300 rounded-full"
              />
              <h2 tw="text-[48px] font-bold leading-none text-slate-900 ml-6">
                Eason Chang
              </h2>
            </div>
            <h1 tw="w-full text-[48px] font-bold leading-none text-slate-900 mb-2 overflow-hidden max-h-[176px] shrink-0">
              {title}
            </h1>
            <h3 tw="w-full text-[32px] leading-tight font-normal text-slate-600 overflow-hidden max-h-[140px] shrink-0">
              {description}
            </h3>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'Noto Sans TC', data: regular, weight: 400, style: 'normal' },
          { name: 'Noto Sans TC', data: bold, weight: 700, style: 'normal' },
        ],
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate the image', { status: 500 });
  }
}
