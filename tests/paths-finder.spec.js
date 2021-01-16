const { getDirFilesPaths, getDirJSFiles, removeRootDir } = require('../src/utils/paths-finder');

describe('Find actions', () => {
  it('Recursive find dir entries', () => {
    const folderPath = './shared/actions';

    const entries = getDirFilesPaths(folderPath);

    expect(entries).toEqual([
      'shared/actions/math/square.js',
      'shared/actions/menu/file.txt',
      'shared/actions/menu/main.js',
      'shared/actions/menu/settings.js',
      'shared/actions/no-action.js',
    ]);
  });

  it('Recursive find .js file', () => {
    const folderPath = './shared/actions';

    const jsFiles = getDirJSFiles(folderPath);

    expect(jsFiles).toEqual([
      'shared/actions/math/square.js',
      'shared/actions/menu/main.js',
      'shared/actions/menu/settings.js',
      'shared/actions/no-action.js',
    ]);
  });
});
