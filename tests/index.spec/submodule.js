const { getHandlerFunctions } = require('../../src');

function sub(a = 0, b = __dirname) {
  return getHandlerFunctions('../shared/actions');
}

module.exports = { sub }
