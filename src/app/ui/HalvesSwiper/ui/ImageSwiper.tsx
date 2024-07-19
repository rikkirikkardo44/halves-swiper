import React, { useState } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';

import type { DefaultSwiperData } from '../types';

/** Параметры компонентв */
type Props<T extends DefaultSwiperData = DefaultSwiperData> = {
  /** Изображения */
  images: T[];
  /** Обработчик изменения */
  onChange: (value: T) => void;
  /** Обработчик клика */
  onClick: (value: T) => void;
};

export const ImageSwiper = <T extends DefaultSwiperData>({
  images,
  onChange,
  onClick,
}: Props<T>) => {
  const [isSliding, setIsSliding] = useState(false);

  let prevIndex = 0;

  const handleChange = (event: SwiperClass): void => {
    if (event.realIndex !== prevIndex) {
      prevIndex = event.realIndex;
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
  }

  return (
    <Swiper
      loop={true}
      direction="vertical"
      spaceBetween={16}
      slidesPerView={1}
      lazyPreloadPrevNext={1}
      normalizeSlideIndex={false}
      onSlideChange={handleChange}
      onSliderMove={handleMove}
      onClick={handleClick}
      style={{ height: '100%' }}
    >
      {images.map(({ image, id }, index) => (
        <SwiperSlide key={id} id={id.toString()}>
          {({ isActive, isPrev, isNext }) => {
            if (!isActive && !isNext && !isPrev) {
              return null;
            }

            return (
              <div
                className={`slide-image ${isSliding ? 'sliding' : ''}`.trim()}
              >
                <img src={image} alt={`Image ${id}`} />
              </div>
            );
          }}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
