/**
 * @example for `at FunctionName (/path/to/file/module.js:6:10)`
 * first group will be `/path/to/file/module.js`
 */
const STACK_FILE_PATH_REGEX = /\((.*)\:[0-9]*\:[0-9]*\)/

/**
 * @param {string} stack 
 * @returns {string} filepath of function that call caller of getCallerPath()
 * @example
 * > getPath() called load()
 * > load() call getCallerPath()
 * > getCallerPath() returned path of file where getPath() located
 */
function parseStack(stack) {
  rows = stack.split('\n');
  
  // Ignore first 3 items
  // 1.  Error text
  // 2.  Current file path
  // 3.  Caller of getCallerPath()
  // ... Next filepath is caller of caller functionCallerPath
  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];

    // First regex group value is file path
    const file_path = row.match(STACK_FILE_PATH_REGEX)[1]
    if (file_path) { return file_path; }
  }

  return '';
}

/**
 * Возвращает файл из которого вызвали функцию в которой вызвана getCallerPath()
 * @returns {string}
 */
module.exports = function getCallerPath() {
  try {
    throw new Error("");
  } catch (e) {
    return parseStack(e.stack)
  }
}