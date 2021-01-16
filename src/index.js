const path = require('path');
const { callbackQueryDataToAction, action } = require('./utils/action');
const { getDirJSFiles, removeFileExtension } = require('./utils/paths-finder');
const getCallerPath = require('./utils/caller-path')

/**
 * Transform absolute file path to relative and removes file extension.
 * @param {string} absoluteFilePath 
 * @param {string} rootHandlersFolder 
 */
function fileAbsolutePathToActionName(absoluteFilePath, rootHandlersFolder) {
  return removeFileExtension(path.relative(rootHandlersFolder, absoluteFilePath));
}

function getHandlerFunctions(handlersFolderPath) {
  const handlerFunctions = {};

  const callerPath = getCallerPath()
  const callerFolderRelativePath = path.dirname(callerPath)
  const callerRelativePath = path.relative(__dirname, callerFolderRelativePath);
  const handlersFolderRelativePath = path.join(callerRelativePath, handlersFolderPath);

  const files = getDirJSFiles(handlersFolderRelativePath);

  files.forEach((filePath) => {
    const handlerName = fileAbsolutePathToActionName(filePath, handlersFolderRelativePath);
    handlerFunctions[handlerName] = require(filePath);

    if (typeof handlerFunctions[handlerName] !== 'function') {
      throw new Error('Handler must be function. For example (ctx) => {}')
    }
  });

  return handlerFunctions;
};

module.exports = {
  getHandlerFunctions,
  callbackQueryDataToAction,
  action
}