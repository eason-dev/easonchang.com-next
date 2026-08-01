import Image, { type ImageProps } from 'next/image';

type Props = ImageProps & { base64?: string };

export default function CustomImage({
  src,
  height,
  width,
  base64,
  ...otherProps
}: Props) {
  if (!src) return null;
  if (typeof src === 'string' && (!height || !width)) {
    // Remote images without known dimensions can't go through next/image.
    // The alt text arrives via otherProps from the MDX img attributes.
    // biome-ignore lint/performance/noImgElement: dimensions unknown, next/image not usable
    // biome-ignore lint/a11y/useAltText: alt is spread from otherProps
    return <img src={src} height={height} width={width} {...otherProps} />;
  }
  return (
    <Image
      src={src}
      height={height}
      width={width}
      placeholder={base64 ? 'blur' : 'empty'}
      blurDataURL={base64}
      {...otherProps}
      sizes="(min-width: 40em) 40em, 100vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  );
}
