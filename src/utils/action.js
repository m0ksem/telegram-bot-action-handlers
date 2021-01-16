/**
 * Module allow bot manipulate with actionName and actionData using
 * telegram callback data.
 */

const SEPARATOR = '|'

class TooBigCallbackDataGenerated extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * @param {String} actionName
 * @param {String} actionData
 *
 * @returns {String} of actionName and actionData separated by `SEPARATOR`
 *
 * @see parse
 * 
 * @example actionName = 'menu/settings', actionData = 'save' => 'menu/settings|save'
 * @throws {TooBigCallbackDataGenerated} if generated callback data length > 64 bytes.
 * 
 * https://core.telegram.org/bots/api#inlinekeyboardbutton
 */
function stringify(actionName, actionData) {
  const str = [actionName, actionData].join(SEPARATOR);
  const strByteSize = Buffer.byteLength(str, 'utf8')

  if (strByteSize > 64) {
    throw new TooBigCallbackDataGenerated(`"${str}" is ${strByteSize} bytes (must be < 64bytes).`);
  }

  return str;
}

/**
 * Parse telegram callback data.
 * @param {String} cbData actionName and action_date separated by `SEPARATOR`
 * @returns {{actionName: string, actionData: string}}
 *
 * @see stringify method to create cbData.
 * 
 * @example 'menu/settings|save' => { actionName: 'menu/settings', actionData: 'save' } 
 */
function parse(cbData) {
  const [actionName, actionData] = cbData.split(SEPARATOR);

  return { actionName, actionData }
}

module.exports = {
  parse,
  stringify,

  // aliases
  /**
   * Transform action name and data to string
   */
  action: stringify,
  callbackQueryDataToAction: parse,
}