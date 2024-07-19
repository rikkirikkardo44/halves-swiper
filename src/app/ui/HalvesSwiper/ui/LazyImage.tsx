import React, { HTMLProps, useEffect, useState } from 'react';

/** Параметры компонента */
type Props = HTMLProps<HTMLDivElement>  & {
  /** Источник изображения */
  src: string;
  /** Альтернативное название */
  alt: string;
}

/**
 * Компонент ленивой загрузки изображения
 * @returns - jsx.element
 */
export const LazyImage: React.FC<Props> = ({ src, alt, ...rest }) => {
  const [loadedSrc, setLoadedSrc] = useState<null | string>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoadedSrc(src);
  }, [src]);

  return (
    <div style={{ width: '100%', height: '100%', ...rest?.style }}>
      {loadedSrc ? <img src={loadedSrc} alt={alt} style={{ width: '100%', height: 'auto' }} /> : <div>Loading...</div>}
    </div>
  );
};
