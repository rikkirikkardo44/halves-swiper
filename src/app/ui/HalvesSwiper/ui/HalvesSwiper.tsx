import React, { memo } from 'react';

import type { SwipeEvent, DefaultSwiperData, ClickEvent } from '../types';
import 'swiper/scss';
import '../styles.scss';

import { ImageSwiper } from './ImageSwiper';

/** Параметры компонента */
type Props<T extends DefaultSwiperData = DefaultSwiperData> = {
  /** Левые половинки */
  left: T[];
  /** Правые половинки */
  right: T[];
  /** Обработчик изменения */
  onChange?: (event: SwipeEvent<T>) => void;
  /** Обработчик клика */
  onClick?: (event: ClickEvent<T>) => void;
};

/**
 * Компонент выбора из двух половинок
 * @returns - jsx-element
 */
export const HalvesSwiper = memo(
  <T extends DefaultSwiperData>({
    left,
    right,
    onClick,
    onChange,
  }: Props<T>) => {
    return (
      <div className="halves-swiper">
        <div className="half">
          <ImageSwiper images={left} />
        </div>
        <div className="half">
          <ImageSwiper images={right} />
        </div>
      </div>
    );
  },
);
