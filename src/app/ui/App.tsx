import React from 'react';

import { HalvesSwiper } from './HalvesSwiper';

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
export const App: React.FC = () => (
  <div className="sandbox-container">
    <HalvesSwiper right={mockForRight} left={mockForLeft} />
  </div>
);
