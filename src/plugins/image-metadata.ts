// Custom rehype plugin to add width/height and a blur placeholder to local
// images, so they can be rendered with next/image.
// Ref: https://kylepfromer.com/blog/nextjs-image-component-blog
import path from 'node:path';

import sharp from 'sharp';
import { visit } from 'unist-util-visit';

type ImageNode = {
  type: 'element';
  tagName: 'img';
  properties: {
    src: string;
    width?: number;
    height?: number;
    base64?: string;
  };
};

function isImageNode(node: unknown): node is ImageNode {
  const img = node as ImageNode;
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    !!img.properties &&
    typeof img.properties.src === 'string'
  );
}

/**
 * Only local images from the public folder (absolute paths) get metadata;
 * remote images are left untouched.
 */
function isLocalImage(node: ImageNode) {
  return node.properties.src.startsWith('/');
}

async function addMetadata(node: ImageNode): Promise<void> {
  const filePath = path.join(process.cwd(), 'public', node.properties.src);
  const image = sharp(filePath);
  const { width, height } = await image.metadata();
  if (!width || !height) {
    throw new Error(`Invalid image with src "${node.properties.src}"`);
  }

  const blurBuffer = await image
    .resize(10, 10, { fit: 'inside' })
    .toFormat('png')
    .toBuffer();

  node.properties.width = width;
  node.properties.height = height;
  node.properties.base64 = `data:image/png;base64,${blurBuffer.toString(
    'base64'
  )}`;
}

export default function imageMetadata() {
  return async function transformer(tree: Parameters<typeof visit>[0]) {
    const imgNodes: ImageNode[] = [];

    visit(tree, 'element', (node) => {
      if (isImageNode(node) && isLocalImage(node)) {
        imgNodes.push(node);
      }
    });

    for (const node of imgNodes) {
      await addMetadata(node);
    }

    return tree;
  };
}
