import React, { CSSProperties, memo, useRef, useState } from 'react';
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';

import type { DefaultSwiperData } from '../types';

import { SwipeButton } from './SwipeButton';

/** Стили для свайпера */
const SWIPER_STYLES: CSSProperties = { height: '100%' };

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
};

/** Компонент вертикального свайпа изображения */
const ImageSwiperComponent = <T extends DefaultSwiperData>({
  images,
  onChange,
  onClick,
  position,
  withControls,
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
        spaceBetween={16}
        slidesPerView={1}
        onSlideChange={handleChange}
        onSliderMove={handleMove}
        onClick={handleClick}
        style={SWIPER_STYLES}
        className={`position--${position}`}
      >
        {withControls && (
          <span slot="container-start">
            <SwipeButton direction="up" />
          </span>
        )}
        {images.map(({ image, id, alt }) => (
          <SwiperSlide key={id}>
            {({ isActive, isPrev, isNext }) => {
              if (!isActive && !isNext && !isPrev) {
                return null;
              }

              return (
                <div
                  className={`slide-image ${isSliding ? 'sliding' : ''}`.trim()}
                >
                  <img src={image} alt={alt ?? `Image ${id}`} />
                </div>
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
