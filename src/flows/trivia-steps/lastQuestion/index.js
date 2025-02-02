const { addKeyword } = require("@bot-whatsapp/bot");

const { isInactiveForGettingResponse } = require("../../../services");
const { TRIVIA_CONVERSATION_BOT } = require("../../../constants");
const { cache } = require("../../../config");
const { triviaAnswer } = require("../trivia-steps.answer");
const { triviaAction } = require("../trivia-steps.action");

const { lastQuestionStep } = TRIVIA_CONVERSATION_BOT;
const { keywords, questions, answers } = lastQuestionStep;
const [question1, question2] = questions;

const triviaLastQuestionStepFlow = addKeyword(keywords)
  .addAction(async (ctx, { provider }) => {
    return await triviaAction({
      ctx,
      provider,
      questionIndex: 4,
      question: question1,
    });
  })
  .addAnswer(
    question2,
    { capture: true, delay: 1000 },
    async (ctx, { fallBack, endFlow, flowDynamic }) => {
      const phone = ctx.from;
      const isInactive = await isInactiveForGettingResponse({ phone, endFlow });
      if (isInactive) return;

      const triviaCache = cache().get(phone).trivia[4];
      await triviaAnswer({
        optionTyped: ctx.body,
        phone,
        listRowsParams: triviaCache.rows,
        fallBack,
        question: triviaCache.question,
        questionNumber: 5,
      });
      await flowDynamic(answers, { delay: 1000 });
      return;
    },
    []
  );

module.exports = { triviaLastQuestionStepFlow };
