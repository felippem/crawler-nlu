/* eslint no-global-assign: 0 */
/**
 * Configuração global do ESM para utilização de recursos do ECMAScript,
 * juntamentoe com o padrão CommonJS do Node.
 * Docs: https://github.com/standard-things/esm
 */
require = require('@std/esm')(module);
module.exports = require('./main.mjs').default;
