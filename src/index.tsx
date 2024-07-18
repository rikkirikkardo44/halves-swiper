import React from 'react';

import ReactDOM from 'react-dom/client';

import { App } from './app';

import '@shared/styles/main.scss';

export const render = (): void => {
  const app = document.getElementById('app');

  if (!app) {
    throw new Error();
  }

  ReactDOM.createRoot(app).render(<App />);
};

window.addEventListener('load', render);
