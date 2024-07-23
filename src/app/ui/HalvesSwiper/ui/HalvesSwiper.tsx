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
  /** Максимальная высота */
  maxHeight?: number;
  /** Максимальная ширина */
  maxWidth?: number;
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
  maxHeight = 500,
  maxWidth = 500,
}: Props<T>) => {
  const left = useImagesState(leftByProps);
  const right = useImagesState(rightByProps);

  const [height, setHeight] = useState(0);

  const activeLeft = useRef(left[0]);
  const activeRight = useRef(right[0]);

  const handleHeightChange = useCallback((newHeight: number) => {
    setHeight(newHeight);
  }, []);

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
    <div
      className="halves-swiper"
      style={{
        height: height ? `${height}px` : `${maxHeight}px`,
        maxHeight: `${maxHeight}px`,
        maxWidth: `${maxWidth}px`,
      }}
    >
      <div className="half">
        <ImageSwiper
          position="left"
          images={left}
          onChange={handleLeftChange}
          onClick={handleClick}
          withControls={withControls}
          onImageResize={handleHeightChange}
        />
      </div>
      <div className="half">
        <ImageSwiper
          position="right"
          images={right}
          onChange={handleRightChange}
          onClick={handleClick}
          withControls={withControls}
          onImageResize={handleHeightChange}
        />
      </div>
    </div>
  );
};

/** Мемоизированный компонент */
export const HalvesSwiper = memo(
  HalvesSwiperComponent,
) as typeof HalvesSwiperComponent;
