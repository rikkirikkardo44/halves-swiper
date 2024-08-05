const path = require('path');

const appPaths = {
  // папка с исходниками приложения
  appDir: path.resolve(__dirname, '../../src'),
  // папка с общими элементами приложения (утилиты, компоненты и т.п.)
  appShared: path.resolve(__dirname, '../../src/shared'),
  // папка с контейнерами страниц приложения
  appPages: path.resolve(__dirname, '../../src/pages'),
  // папка с билдом приложения
  appDist: path.resolve(__dirname, '../../dist'),
  // папка с билдом приложения
  appBuild: path.resolve(__dirname, '../../build'),
  // папка с ресурсами приложения (картинками шрифтами и пр.)
  appAssets: path.resolve(__dirname, '../../puplic'),
  // папка со стилями
  appStyles: path.resolve(__dirname, '../../src/shared/styles'),
  // точка входа в приложение
  appIndex: path.resolve(__dirname, '../../src/index.tsx'),
  // компонент
  halvesSwiperPath: path.resolve(__dirname, '../../src/app/ui/HalvesSwiper/index.ts'),
  // точка входа в приложение в режиме разработки
  appDevIndex: path.resolve(__dirname, '../../src/index.tsx'),
  // HTML шаблон приложения
  appHTMLTemplate: path.resolve(__dirname, '../../public/index.html'),
  // Favicon приложения
  appFavicon: path.resolve(__dirname, '../../dist/logo.png'),
  // путь к папке package.json
  appPackageJson: path.resolve(__dirname, '../../package.json'),
};

module.exports = appPaths;
