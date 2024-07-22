import React, { useState } from 'react';

import { TABLET_SIZE } from '@shared/constants';
import { useIsMobile } from '@shared/hooks';

import { HalvesSwiper, ClickEvent, SwipeEvent } from './HalvesSwiper';

type ExternalType = {
  id: number;
  image: string;
  isMock: boolean;
};

const addOriginToPath = (path: string): string =>
  `${window.location.origin}/${path}`;

const mockForLeft: ExternalType[] = [
  {
    id: 13,
    image: addOriginToPath('mock/left/Plate13.png'),
    isMock: true,
  },
  {
    id: 14,
    image: addOriginToPath('mock/left/Plate14.png'),
    isMock: true,
  },
  {
    id: 15,
    image: addOriginToPath('mock/left/Plate15.png'),
    isMock: true,
  },
  {
    id: 18,
    image: addOriginToPath('mock/left/Plate18.png'),
    isMock: true,
  },
  {
    id: 110,
    image: addOriginToPath('mock/left/Plate110.png'),
    isMock: true,
  },
];

const mockForRight: ExternalType[] = [
  {
    id: 3,
    image: addOriginToPath('mock/right/Plate3.png'),
    isMock: true,
  },
  {
    id: 4,
    image: addOriginToPath('mock/right/Plate4.png'),
    isMock: true,
  },
  {
    id: 5,
    image: addOriginToPath('mock/right/Plate5.png'),
    isMock: true,
  },
  {
    id: 8,
    image: addOriginToPath('mock/right/Plate8.png'),
    isMock: true,
  },
  {
    id: 10,
    image: addOriginToPath('mock/right/Plate10.png'),
    isMock: true,
  },
  {
    id: 11,
    image: addOriginToPath('mock/right/Plate11.png'),
    isMock: true,
  },
];

/**
 * Приложение
 * @returns - компонент
 */
export const App: React.FC = () => {
  const [currentChoice, setCurrentChoice] = useState<SwipeEvent['value']>([
    mockForLeft[0],
    mockForRight[0],
  ]);

  const [clickedImage, setClickedImages] = useState<ExternalType | null>(null);

  const isTablet = useIsMobile(TABLET_SIZE);

  const handleChange = ({ value }: SwipeEvent): void => {
    console.log('Swiped: ', { value });
    setCurrentChoice(value);
  };

  const handleClick = ({ value }: ClickEvent<ExternalType>): void => {
    console.log('Clicked: ', { value });
    setClickedImages(value);
  };

  return (
    <div className="sandbox-container">
      <div className="flex align-center justify-center gap4">
        <span>Selected:</span>
        <img src={currentChoice[0]?.image} alt="" height={'100px'} />
        <img src={currentChoice[1]?.image} alt="" height={'100px'} />
      </div>

      <div className="flex align-center justify-center gap4">
        <span>Clicked:</span>
        <img src={clickedImage?.image} alt="" height={'100px'} />
      </div>

      <div className="swiper-container">
        <HalvesSwiper
          right={mockForRight}
          left={mockForLeft}
          onClick={handleClick}
          onChange={handleChange}
          withControls={!isTablet}
        />
      </div>
    </div>
  );
};
