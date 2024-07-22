import React, { memo, useCallback, useRef } from 'react';

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
  /** Призак использования UI кнопок */
  withControls?: boolean;
};

/**
 * Компонент выбора из двух половинок
 * @returns - jsx-element
 */
const HalvesSwiperComponent = <T extends DefaultSwiperData>({
  left,
  right,
  onClick,
  onChange,
  withControls,
}: Props<T>) => {
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
      <div className="half">
        <ImageSwiper
          position="left"
          images={left}
          onChange={handleLeftChange}
          onClick={handleClick}
          withControls={withControls}
        />
      </div>
      <div className="half">
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
