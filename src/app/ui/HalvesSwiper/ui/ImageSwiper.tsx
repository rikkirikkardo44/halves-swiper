import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { DefaultSwiperData } from '../types';

/** Параметры компонентв */
type Props<T extends DefaultSwiperData = DefaultSwiperData> = {
  /** Изображения */
  images: T[];
};

export const ImageSwiper = <T extends DefaultSwiperData>({
  images,
}: Props<T>) => {
  return (
    <Swiper
      lazy={true}
      loop={true}
      direction="vertical"
      spaceBetween={16}
      slidesPerView={1}
      onSwiper={(swiper: any) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      style={{ height: '100%' }}
    >
      {images.map(({ image }, index) => (
        <SwiperSlide key={index}>
          <div className="slide-image">
            <img src={image} alt={`Image ${index}`} loading="lazy" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
