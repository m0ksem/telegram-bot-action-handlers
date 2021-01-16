const { action } = require('../../src/utils/action');

describe('Utils action', () => {
  it('stringify', () => {
    const result = action('path/to', 'test-data');

    expect(result).toBe('path/to|test-data');
  });

  it('stringify (too big)', () => {
    try {
      action('path/to', 't'.repeat(12));
    }
    catch (e) {
      expect(e.name).toBe("TooBigCallbackDataGenerated");
    }
  });
});