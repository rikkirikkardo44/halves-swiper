import React, { useState, useRef } from 'react';
import { useSwipeable, SwipeEventData } from 'react-swipeable';

import type { DefaultSwiperData } from '../types';

import { LazyImage } from './LazyImage';

/** Параметры компонентв */
type Props<T extends DefaultSwiperData = DefaultSwiperData> = {
  /** Изображения */
  images: T[];
};

/**
 * Компонент свайпа изображений
 * @returns - jsx.element
 */
export const ImageSwiper = <T extends DefaultSwiperData>({
  images,
}: Props<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDelta, setSwipeDelta] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const swipeRef = useRef<HTMLDivElement>(null);

  const handleSwiping = (event: SwipeEventData): void => {
    setIsSwiping(true);
    setSwipeDelta(event.deltaY);
  };

  const handleSwiped = (event: SwipeEventData): void => {
    setIsSwiping(false);
    setSwipeDelta(0);
    const threshold = swipeRef.current?.offsetHeight || 0;

    if (Math.abs(event.deltaY) > threshold / 2) {
      if (event.deltaY < 0) {
        setCurrentIndex((currentIndex + 1) % images.length);
      } else {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
      }
    }
  };

  const { onMouseDown } = useSwipeable({
    onSwiping: handleSwiping,
    onSwiped: handleSwiped,

    // onTap: console.log,
    // onSwipeStart: console.log,
    // onSwipedDown: console.log,
    // onSwipedLeft: console.log,
    // onSwipedUp: console.log,
    // onSwipedRight: console.log,
    // onTouchEndOrOnMouseUp: console.log,
    // onTouchStartOrOnMouseDown: console.log,

    delta: 10, // Threshold for considering it a swipe
    // swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const nextIndex = (currentIndex + 1) % images.length;
  const prevIndex = (currentIndex - 1 + images.length) % images.length;

  return (
    <div
      className={`image-container ${isSwiping ? 'swiping' : ''}`}
      style={{
        height: `${imageHeight}px`,
      }}
      onMouseDown={onMouseDown}
      ref={swipeRef}
    >
      <div
        className="current-image"
        style={{
          transform: `translateY(${swipeDelta}px)`,
          opacity: isSwiping ? 0.5 : 1,
        }}
      >
        <img
          src={images[currentIndex].image}
          alt={`Image ${currentIndex}`}
          onLoad={(event: React.SyntheticEvent<HTMLImageElement>) => {
            setImageHeight((event.target as any)?.offsetHeight);
          }}
        />
      </div>

      {/* Следующее изображение (снизу) */}
      {isSwiping && swipeDelta < -16 && (
        <div
          className="next-image"
          style={{
            transform: `translateY(${
              swipeDelta + (swipeRef.current?.offsetHeight || 0) + 16
            }px)`,
            opacity: 0.5,
          }}
        >
          <LazyImage src={images[nextIndex].image} alt={`Image ${nextIndex}`} />
        </div>
      )}

      {/* Предыдущее изображение (сверху) */}
      {isSwiping && swipeDelta > 16 && (
        <div
          className="prev-image"
          style={{
            transform: `translateY(${
              swipeDelta - (swipeRef.current?.offsetHeight || 0) - 16
            }px)`,
            opacity: 0.5,
          }}
        >
          <LazyImage src={images[prevIndex].image} alt={`Image ${prevIndex}`} />
        </div>
      )}
    </div>
  );
};
