/**
 * Module allow bot manipulate with actionName and actionData using
 * telegram callback data.
 */

const SEPARATOR = '|'

/**
 * @param {String} actionName
 * @param {String} actionData
 *
 * @returns {String} of actionName and actionData separated by `SEPARATOR`
 *
 * @see parse
 * 
 * @example actionName = 'menu/settings', actionData = 'save' => 'menu/settings|save'
 */
function stringify(actionName, actionData) {
  if (typeof actionData === 'string') {
    return [actionName, actionData].join(SEPARATOR);
  }

  throw new Error('actionData can be string only')
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