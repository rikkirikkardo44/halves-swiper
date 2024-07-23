# Halves Swiper

Компонент для выбора блюда из двух половин при помощи вертикального свайпа или UI кнопок.

Для использования в проекте нужно скопировать папку [HalvesSwiper](./src/app/ui/HalvesSwiper) к себе в проект.
И установить нужные пакеты:

```json
{
  "react": "^16.14.0",
  "react-dom": "^16.14.0",
  "swiper": "11.1.5"
}
```


Пример использования:

```javascript
import { HalvesSwiper, SwipeEvent, ClickEvent } from './HalvesSwiper';

const MyComponent = ({ leftImages, rightImages }) => {
  const handleClick = (event: ClickEvent) => {
  };
  const handleChange = (event: SwipeEvent) => {
  };

  return (
    <HalvesSwiper
      left={leftImages}
      right={rightImages}
      onClick={handleClick}
      onChange={handleChange}
    />
  )
}
```

## Props

| Параметр     | Тип                            | Обязательный | Дефолтное значение | Описание                      |
|--------------|--------------------------------|--------------|--------------------|-------------------------------|
| left         | T[]                            | +            | -                  | Изображения для левой части   |
| right        | T[]                            | +            | -                  | Изображения для правой части  |
| onChange     | (event: SwipeEvent<T>) => void | -            | -                  | Обработчик выбора изображений |
| onClick      | (event: ClickEvent<T>) => void | -            | -                  | Обработчик клика              |
| withControls | boolean                        | -            | -                  | Призак отображения UI кнопок  |
| maxHeight    | number                         | -            | 500                | Максимальная высота           |
| maxWidth     | number                         | -            | 500                | Максимальная ширина           |


