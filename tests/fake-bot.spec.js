const { getHandlerFunctions, onCallbackQuery, callbackQueryDataToAction } = require("../src");

describe('Fake bot', () => {
  it('i', () => {
    const bot = {
      on(event, cb) {
        cb({ callbackQuery: { data: 'math/square|12' }})
      }
    };

    const actionHandlers = getHandlerFunctions('./shared/actions')

    bot.on('callback_query', (ctx) => {
      const { actionData, actionName} = callbackQueryDataToAction(ctx.callbackQuery.data)

      expect(actionName).toBe('math/square');
      expect(actionData).toBe('12');

      const handlerResult = actionHandlers[actionName](ctx, actionData);

      expect(handlerResult).toBe(12*12)
    });
  });
});