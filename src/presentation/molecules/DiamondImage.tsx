interface DiamondImageProps {
  position: 1 | 2 | 3;
  src: string;
  alt: string;
}

export function DiamondImage({ position, src, alt }: DiamondImageProps) {
  return (
    <div className={`diamond-card diamond-${position}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}
