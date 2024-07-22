import { useEffect, useState } from 'react';

import { useWindowSize } from './useWindowSize';

/**
 * Хук возвращает признак мобильного устройства в зависимости от брейкпоинта
 * @param breakpoint - минимальный размер экрана десктопной версии
 * @returns - результат
 */
export const useIsMobile = (breakpoint: number): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsMobile(width < breakpoint);
  }, [width]);

  return isMobile;
};
