import { useEffect, useState } from 'react';

import type { DefaultSwiperData } from './types';

/**
 * Хук для состояния изображений
 * @param data - данные
 * @returns - текущее состояние
 */
export const useImagesState = <T extends DefaultSwiperData>(
  data: T[],
): T[] => {
  const [images, setImages] = useState<T[]>(data);

  useEffect(() => {
    setImages((prev) => {
      if (!prev.length) {
        return data;
      }

      const filteredData = data.filter(
        ({ id }) => !prev.some((item) => item.id === id),
      );

      if (!filteredData.length) {
        return prev;
      }

      return [...prev, ...filteredData];
    });
  }, [data]);

  return images;
};
