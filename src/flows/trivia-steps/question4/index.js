const { addKeyword } = require('@bot-whatsapp/bot');

const { isInactiveForGettingResponse } = require('../../../services');
const { TRIVIA_CONVERSATION_BOT } = require('../../../constants');
const { cache } = require('../../../config');
const { triviaAnswer } = require('../trivia-steps.answer');
const { triviaAction } = require('../trivia-steps.action');
const { triviaLastQuestionStepFlow } = require('../lastQuestion');

const { question4Step } = TRIVIA_CONVERSATION_BOT;
const { keywords, questions } = question4Step;
const [question1, question2] = questions;

const triviaQuestion4StepFlow = addKeyword(keywords)
  .addAction(async (ctx, { provider }) => {
    return await triviaAction({
      ctx,
      provider,
      questionIndex: 3,
      question: question1,
    });
  })
  .addAnswer(
    question2,
    { capture: true, delay: 1000 },
    async (ctx, { fallBack, endFlow }) => {
      const phone = ctx.from;
      const isInactive = await isInactiveForGettingResponse({ phone, endFlow });
      if (isInactive) return;

      const triviaCache = cache().get(phone).trivia[3];
      await triviaAnswer({
        optionTyped: ctx.body,
        phone,
        listRowsParams: triviaCache.rows,
        fallBack,
      });
      return;
    },
    [triviaLastQuestionStepFlow]
  );

module.exports = { triviaQuestion4StepFlow };
