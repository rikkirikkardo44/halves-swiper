const merge = require('merge');
const { get } = require('lodash');

const settings = require('./settings');
const paths = require('./paths');
const devServer = require('./dev-server');

const config = merge(settings, paths, devServer);

/**
 * ### Получение настроек
 *
 * @example
 * getConfig('app.name', '');
 *
 * @param {string} path - путь до настройки
 * @param {any} defaultValue - что вернется по умолчанию
 * @param {string} separator - разделитель
 *
 * @returns {any} значение настройки
 */
module.exports = (path, defaultValue = '', separator = '.') => {
  const pathSettings = path.split(separator);
  return get(config, pathSettings, defaultValue);
};
