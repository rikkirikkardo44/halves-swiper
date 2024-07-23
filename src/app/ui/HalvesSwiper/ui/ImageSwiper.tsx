import React, { memo, useRef, useState } from 'react';
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';

import type { DefaultSwiperData } from '../types';

import { ResizableImage } from './ResizableImage';
import { SwipeButton } from './SwipeButton';

/** Параметры компонентв */
type Props<T extends DefaultSwiperData = DefaultSwiperData> = {
  /** Изображения */
  images: T[];
  /** Обработчик изменения */
  onChange: (value: T) => void;
  /** Обработчик клика */
  onClick: (value: T) => void;
  /** Позиция */
  position: 'left' | 'right';
  /** Признак использования UI кнопок */
  withControls?: boolean;
  /** Обработчик при ресайзе изображения */
  onImageResize: (height: number) => void;
};

/** Компонент вертикального свайпа изображения */
const ImageSwiperComponent = <T extends DefaultSwiperData>({
  images,
  onChange,
  onClick,
  position,
  withControls,
  onImageResize,
}: Props<T>) => {
  const [isSliding, setIsSliding] = useState(false);
  const prevIndex = useRef(0);

  const handleChange = (event: SwiperClass): void => {
    if (event.realIndex !== prevIndex.current) {
      prevIndex.current = event.realIndex;
      onChange(images[event.realIndex]);
    }
    setIsSliding(false);
  };

  const handleMove = (): void => {
    if (!isSliding) {
      setIsSliding(true);
    }
  };

  const handleClick = (event: SwiperClass): void => {
    onClick(images[event.realIndex]);
  };

  return (
    <>
      <Swiper
        loop
        direction="vertical"
        slidesPerView={1}
        onSlideChange={handleChange}
        onSliderMove={handleMove}
        onClick={handleClick}
        className={`position--${position}`}
      >
        {withControls && (
          <span slot="container-start">
            <SwipeButton direction="up" />
          </span>
        )}
        {images.map(({ image, id, alt }) => (
          <SwiperSlide key={id} className="half-swiper">
            {({ isActive, isPrev, isNext }) => {
              if (!isActive && !isNext && !isPrev) {
                return null;
              }

              return (
                <ResizableImage
                  src={image}
                  alt={alt ?? `Image ${id}`}
                  className={`slide-image ${isSliding ? 'sliding' : ''}`.trim()}
                  onResize={onImageResize}
                />
              );
            }}
          </SwiperSlide>
        ))}
        {withControls && (
          <span slot="container-end">
            <SwipeButton direction="down" />
          </span>
        )}
      </Swiper>
    </>
  );
};

/** Мемоизированный компонент */
export const ImageSwiper = memo(
  ImageSwiperComponent,
) as typeof ImageSwiperComponent;
