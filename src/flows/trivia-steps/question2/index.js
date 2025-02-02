const { addKeyword } = require("@bot-whatsapp/bot");

const { isInactiveForGettingResponse } = require("../../../services");
const { TRIVIA_CONVERSATION_BOT } = require("../../../constants");
const { cache } = require("../../../config");
const { triviaAnswer } = require("../trivia-steps.answer");
const { triviaAction } = require("../trivia-steps.action");
const { triviaQuestion3StepFlow } = require("../question3");

const { question2Step } = TRIVIA_CONVERSATION_BOT;
const { keywords, questions } = question2Step;
const [question1, question2] = questions;

const triviaQuestion2StepFlow = addKeyword(keywords)
  .addAction(async (ctx, { provider }) => {
    return await triviaAction({
      ctx,
      provider,
      questionIndex: 1,
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

      const triviaCache = cache().get(phone).trivia[1];
      await triviaAnswer({
        optionTyped: ctx.body,
        phone,
        listRowsParams: triviaCache.rows,
        fallBack,
        question: triviaCache.question,
        questionNumber: 2,
      });
      return;
    },
    [triviaQuestion3StepFlow]
  );

module.exports = { triviaQuestion2StepFlow };
