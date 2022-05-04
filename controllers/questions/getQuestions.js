const { Question } = require('../../models/question');

const getQuestions = async (req, res) => {
  const questionType = req.path.slice(1);
  const result = await Question.aggregate([
    {
      $match: { questionType: { $eq: questionType } },
    },
  ])
    .sample(12)
    .project({ _id: 0, rightAnswer: 0 });
  res.status(200).json(result);
};

module.exports = getQuestions;
