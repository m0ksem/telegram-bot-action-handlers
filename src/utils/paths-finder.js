const fs = require('fs');
const path = require('path');

/**
 * @param {string} fileName 
 * @returns {boolean} true if file have .js extension
 */
function isJsFile(fileName) {
  return fileName.slice(fileName.length - 3) === '.js';
}

/**
 * @param {string} dirPath 
 * @returns {boolean}
 */
function isDir(dirPath) {
  const stat = fs.lstatSync(dirPath);
  return stat.isDirectory();
}

function getDirFilesPathsWithoutPathTransform(relativePath, absolutePath) {
  const entries = fs.readdirSync(absolutePath);
  const files = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    const entryRelativePath = path.join(relativePath, entry);
    const entryAbsolutePath = path.join(absolutePath, entry);

    if (isDir(entryAbsolutePath)) {
      files.push(...getDirFilesPathsWithoutPathTransform(entryRelativePath, entryAbsolutePath));
    } else {
      files.push(entryRelativePath);
    }
  }

  return files;
}

function getDirFilesPaths(dirPath) {
  const executionParentAbsoluteFilePath = path.dirname(module.parent.filename);
  const executionParentRelativeFilePath = path.relative(__dirname, executionParentAbsoluteFilePath);
  const dirRelativePath = path.join(executionParentRelativeFilePath, dirPath);
  const dirAbsolutePath = path.join(__dirname, dirRelativePath)
  
  return getDirFilesPathsWithoutPathTransform(dirPath, dirAbsolutePath)
};

function getDirJSFiles(dirPath) {
  return getDirFilesPaths(dirPath).filter(isJsFile);
};

/**
 * Removes file extension.
 * Removes string after '.' in filePath.
 * @param {string} filePath 
 * @returns file path without extension
 * @example 'path/to/file.js' => 'path/to/file'
 */
function removeFileExtension(filePath) {
  return filePath.split('.').slice(0, -1).join('.');
}

module.exports = {
  getDirFilesPaths,
  getDirJSFiles,
  removeFileExtension,
};