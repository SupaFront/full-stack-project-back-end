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
    throw createError(400);
  }
  const answersIds = userAnswers.map(answer => answer._id);
  const rightAnswers = await Question.find(
    { questionType, _id: { $in: answersIds } },
    'rightAnswer _id',
  );

  const comparedAnswers = userAnswers
    .map(userAnsw =>
      rightAnswers.find(
        rightAnsw => userAnsw._id === rightAnsw._id && userAnsw.answer === rightAnsw.rightAnswer,
      ),
    )
    .filter(el => el !== undefined);

  const message = createResultMessage(userAnswers.length, comparedAnswers.length);

  res.status(200).json(message);
};

module.exports = getResults;
