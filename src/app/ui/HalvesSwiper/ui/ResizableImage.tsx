import React, { useEffect, useRef } from 'react';

/** Параметры компонента */
type Props = Pick<HTMLImageElement, 'src' | 'alt' | 'className'> & {
  /** Обработчик при ресайзе */
  onResize: (height: number) => void;
};

/**
 * Изображение с авторесайзом
 * @returns - jsx.element
 */
export const ResizableImage: React.FC<Props> = ({
  className,
  src,
  alt,
  onResize,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentHeightRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        if (entry.target === wrapperRef.current) {
          animationFrameId = window.requestAnimationFrame(() => {
            if (wrapperRef.current) {
              const height = wrapperRef.current.getBoundingClientRect().height;
              const heightDifference = Math.abs(
                height - currentHeightRef.current,
              );
              const heightDifferencePercentage =
                (heightDifference / currentHeightRef.current) * 100;
              if (
                (height > currentHeightRef.current &&
                  heightDifferencePercentage > 1) ||
                heightDifferencePercentage > 5
              ) {
                currentHeightRef.current = height;
                onResize(height);
              }
            }
          });
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        resizeObserver.unobserve(wrapperRef.current);
      }
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [onResize]);

  return (
    <div className={className} ref={wrapperRef}>
      <img src={src} alt={alt} />
    </div>
  );
};
