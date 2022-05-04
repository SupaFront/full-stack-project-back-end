const { createResultMessage } = require('../../helpers');
const { createError } = require('../../middleware');
const { Question } = require('../../models/question');

const getResults = async (req, res) => {
  const questionType = req.params.type.split('-')[0];
  console.log(questionType);
  const { answers: userAnswers } = req.body;
  if (userAnswers.length !== 12) {
    throw createError(400);
  }
  const answersIds = userAnswers.map(answer => answer.questionId);
  const rightAnswers = await Question.find(
    { questionType, questionId: { $in: answersIds } },
    'questionId rightAnswer -_id',
  );

  const comparedAnswers = userAnswers
    .map(userAnsw =>
      rightAnswers.find(
        rightAnsw =>
          userAnsw.questionId === rightAnsw.questionId && userAnsw.answer === rightAnsw.rightAnswer,
      ),
    )
    .filter(el => el !== undefined);

  const message = createResultMessage(userAnswers.length, comparedAnswers.length);

  res.status(200).json(message);
};

module.exports = getResults;
