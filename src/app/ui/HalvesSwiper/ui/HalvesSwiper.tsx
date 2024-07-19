import React, { memo, useRef } from 'react';

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
export const HalvesSwiper = <T extends DefaultSwiperData>({
  left,
  right,
  onClick,
  onChange,
}: Props<T>) => {
  const activeLeft = useRef(left[0]);
  const activeRight = useRef(right[0]);

  const handleLeftChange = (value: T): void => {
    activeLeft.current = value;

    onChange?.({
      value: [value, activeRight.current],
    });
  };

  const handleRightChange = (value: T): void => {
    activeRight.current = value;

    onChange?.({
      value: [activeLeft.current, value],
    });
  };

  const handleClick = (value: T): void => {
    onClick?.({ value });
  };

  return (
    <div className="halves-swiper">
      <div className="half">
        <ImageSwiper
          images={left}
          onChange={handleLeftChange}
          onClick={handleClick}
        />
      </div>
      <div className="half">
        <ImageSwiper
          images={right}
          onChange={handleRightChange}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
