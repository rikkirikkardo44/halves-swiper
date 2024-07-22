import React, {
  type CSSProperties,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

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

  const [leftImageHeight, setLeftImageHeight] = useState(0);
  const [rightImageHeight, setRightImageHeight] = useState(0);

  const onLeftImageLoad = useCallback((height: number) => {
    setLeftImageHeight(() => height);
  }, []);

  const onRightImageLoad = useCallback((height: number) => {
    setRightImageHeight(() => height);
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

  const height = Math.min(leftImageHeight, rightImageHeight);

  const style = useMemo(
    (): CSSProperties => ({
      height: height ? `${height}px` : '100%',
    }),
    [height],
  );

  return (
    <div className="halves-swiper">
      <div className="half">
        <ImageSwiper
          position="left"
          images={left}
          onChange={handleLeftChange}
          onClick={handleClick}
          onImageHeightChange={onLeftImageLoad}
          withControls={withControls}
          style={style}
        />
      </div>
      <div className="half">
        <ImageSwiper
          position="right"
          images={right}
          onChange={handleRightChange}
          onClick={handleClick}
          onImageHeightChange={onRightImageLoad}
          withControls={withControls}
          style={style}
        />
      </div>
    </div>
  );
};

/** Мемоизированный компонент */
export const HalvesSwiper = memo(
  HalvesSwiperComponent,
) as typeof HalvesSwiperComponent;
