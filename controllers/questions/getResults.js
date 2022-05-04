const { createResultMessage } = require('../../helpers');
const { createError } = require('../../middleware');
const { Question, questionTypes } = require('../../models/question');

const getResults = async (req, res) => {
  const { type: questionType } = req.params;

  if (!questionTypes.includes(questionType)) {
    throw createError(404);
  }
  const { answers: userAnswers } = req.body;
  if (userAnswers.length !== 12) {
    throw createError(
      400,
      `Something is wrong with a number of answers, expected 12, received ${userAnswers.length}`,
    );
  }
  const answersIds = userAnswers.map(answer => answer._id);
  const rightAnswers = await Question.find(
    { questionType, _id: { $in: answersIds } },
    'rightAnswer _id',
  );

  const comparedAnswers = userAnswers
    .map(userAnsw =>
      rightAnswers.find(
        rightAnsw =>
          String(rightAnsw._id) === userAnsw._id && userAnsw.answer === rightAnsw.rightAnswer,
      ),
    )
    .filter(el => el !== undefined);

  const message = createResultMessage(userAnswers.length, comparedAnswers.length);

  res.json(message);
};

module.exports = getResults;
