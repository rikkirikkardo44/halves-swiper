/** Дефолтный тип */
export type DefaultSwiperData = {
  /** Идентификатор */
  id: string | number;
  /** Ссылка на изображение */
  image: string;
  /** Альтернативное название */
  alt?: string;
};

/** Эвент свайпа */
export type SwipeEvent<T extends DefaultSwiperData = DefaultSwiperData> = {
  value: [T | null, T | null];
};

/** Эвент клика */
export type ClickEvent<T extends DefaultSwiperData = DefaultSwiperData> = {
  value: T;
};
