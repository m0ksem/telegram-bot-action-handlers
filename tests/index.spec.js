const { sub } = require('./index.spec/submodule');

describe('Find actions', () => {
  it('getHandlerFunctions', () => {
    sub('test');

    expect(true).toBe(true);
  });
});