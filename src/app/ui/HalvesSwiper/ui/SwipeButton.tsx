import React, { SyntheticEvent } from 'react';
import { useSwiper } from 'swiper/react';

/** Иконка стрелки вниз */
const downArrowSvg = (
  <svg
    width="40"
    height="31"
    viewBox="0 0 40 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.8984 23.8191L19.2969 28.8687C19.4687 29.0322 19.7265 29.123 20 29.123C20.2734 29.123 20.5312 29.0322 20.7031 28.8687L26.1015 23.8191C26.4219 23.5164 26.3672 23.0744 25.9844 22.8262C25.5937 22.5779 25.0234 22.6203 24.7031 22.917L20.914 26.459L20.914 2.58535C20.914 2.19785 20.5078 1.87695 20 1.87695C19.5 1.87695 19.0859 2.1918 19.0859 2.58535L19.0859 26.459L15.2969 22.917C15.1172 22.7475 14.8594 22.6627 14.5937 22.6627C14.3906 22.6627 14.1797 22.7172 14.0156 22.8262C13.6328 23.0744 13.5781 23.5225 13.8984 23.8191Z"
      fill="black"
    />
  </svg>
);

/** Иконка стрелки вверх */
const upArrowSvg = (
  <svg
    width="40"
    height="31"
    viewBox="0 0 40 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.1016 7.18086L20.7031 2.13125C20.5313 1.96777 20.2735 1.87695 20 1.87695C19.7266 1.87695 19.4688 1.96777 19.2969 2.13125L13.8985 7.18086C13.5781 7.48359 13.6328 7.92559 14.0156 8.17383C14.4063 8.42207 14.9766 8.37969 15.2969 8.08301L19.086 4.54102L19.086 28.4146C19.086 28.8021 19.4922 29.123 20 29.123C20.5 29.123 20.9141 28.8082 20.9141 28.4146L20.9141 4.54102L24.7031 8.08301C24.8828 8.25254 25.1406 8.3373 25.4063 8.3373C25.6094 8.3373 25.8203 8.28281 25.9844 8.17383C26.3672 7.92559 26.4219 7.47754 26.1016 7.18086Z"
      fill="black"
    />
  </svg>
);

/** Параметры компонента */
type Props = {
  /** Направление */
  direction: 'down' | 'up';
};

/**
 * Кнопка свайпа
 * @returns - jsx-element
 */
export const SwipeButton: React.FC<Props> = ({ direction }) => {
  const swiper = useSwiper();
  const handleClick = (event: SyntheticEvent): void => {
    event.stopPropagation();

    if (direction === 'up') {
      swiper.slideNext();
    } else {
      swiper.slidePrev();
    }
  };

  return (
    <div className="swipe-button" onClick={handleClick}>
      {direction === 'up' ? upArrowSvg : downArrowSvg}
    </div>
  );
};
