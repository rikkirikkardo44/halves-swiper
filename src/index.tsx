import React from 'react';

import ReactDOM from 'react-dom';

import { App } from './app';

import '@shared/styles/main.scss';

export const renderApp = (): void => {
  const app = document.getElementById('app');

  if (!app) {
    throw new Error();
  }

  ReactDOM.render(<App />, app);
};

window.addEventListener('load', renderApp);
