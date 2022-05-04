const { createError } = require('../../middleware');
const { Question, questionTypes } = require('../../models/question');

const getQuestions = async (req, res) => {
  const { type: questionType } = req.params;
  if (!questionTypes.includes(questionType)) {
    throw createError(404);
  }
  const result = await Question.aggregate([
    {
      $match: { questionType: { $eq: questionType } },
    },
  ])
    .sample(12)
    .project({ _id: 1, rightAnswer: 0 });
  res.status(200).json(result);
};

module.exports = getQuestions;
