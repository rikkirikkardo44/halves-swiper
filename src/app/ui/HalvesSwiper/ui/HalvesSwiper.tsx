import React, { memo, useCallback, useRef, useState } from 'react';

import type { SwipeEvent, DefaultSwiperData, ClickEvent } from '../types';
import { useImagesState } from '../useImagesState';

import { ImageSwiper } from './ImageSwiper';

import 'swiper/scss';
import '../styles.scss';

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
  /** Призак использования UI кнопок */
  withControls?: boolean;
};

/**
 * Компонент выбора из двух половинок
 * @returns - jsx-element
 */
const HalvesSwiperComponent = <
  T extends DefaultSwiperData = DefaultSwiperData,
>({
  left: leftByProps,
  right: rightByProps,
  onClick,
  onChange,
  withControls,
}: Props<T>) => {
  const left = useImagesState(leftByProps);
  const right = useImagesState(rightByProps);

  const activeLeft = useRef(left[0]);
  const activeRight = useRef(right[0]);

  const handleLeftChange = useCallback(
    (value: T): void => {
      activeLeft.current = value;

      onChange?.({
        value: [value, activeRight.current],
      });
    },
    [onChange],
  );

  const handleRightChange = useCallback(
    (value: T): void => {
      activeRight.current = value;

      onChange?.({
        value: [activeLeft.current, value],
      });
    },
    [onChange],
  );

  const handleClick = useCallback(
    (value: T): void => {
      onClick?.({ value });
    },
    [onClick],
  );

  return (
    <div className="halves-swiper">
      <div className="half half--left">
        <ImageSwiper
          position="left"
          images={left}
          onChange={handleLeftChange}
          onClick={handleClick}
          withControls={withControls}
        />
      </div>
      <div className="half half--right">
        <ImageSwiper
          position="right"
          images={right}
          onChange={handleRightChange}
          onClick={handleClick}
          withControls={withControls}
        />
      </div>
    </div>
  );
};

/** Мемоизированный компонент */
export const HalvesSwiper = memo(
  HalvesSwiperComponent,
) as typeof HalvesSwiperComponent;
