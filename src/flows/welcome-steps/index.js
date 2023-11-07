const { addKeyword } = require('@bot-whatsapp/bot');

const { delay } = require('../../helpers');
const {
  findUserByPhone,
  isInactiveForGettingResponse,
} = require('../../services');
const { TRIVIA_CONVERSATION_BOT } = require('../../constants');

const { welcomeIsRegisteredUserAction } = require('./welcome.actions');
const { whichFlowAfterWelcome } = require('./welcome.answer');

const { fullNameStepFlow } = require('../fullname-steps');
const { emailStepFlow } = require('../email-steps');
const { menuStepFlow } = require('../menu-steps');

const { welcomeStep } = TRIVIA_CONVERSATION_BOT;
const { keywords } = welcomeStep;

const welcomeStepFlow = addKeyword(keywords)
  .addAction(async (ctx, { endFlow }) => {
    const phone = ctx.from;
    const isInactive = await isInactiveForGettingResponse({ phone, endFlow });
    if (isInactive) return;
    return;
  })
  .addAnswer(
    'Hi!',
    {
      capture: false,
    },
    async (ctx, { gotoFlow, flowDynamic }) => {
      const phone = ctx.from;
      const user = await findUserByPhone(phone);

      await delay(2000);
      await welcomeIsRegisteredUserAction({
        flowDynamic,
        user,
      });

      await delay(2000);
      await whichFlowAfterWelcome({ gotoFlow, phone, user });
      return;
    },
    [menuStepFlow, fullNameStepFlow, emailStepFlow]
  );

module.exports = {
  welcomeStepFlow,
};
