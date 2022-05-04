const Joi = require('joi');
const { Schema, model } = require('mongoose');

const questionTypes = ['tech', 'theory'];

const questionSchema = Schema(
  {
    question: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      enum: questionTypes,
      required: true,
    },
    rightAnswer: {
      type: String,
      required: true,
    },
    answers: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false, timestamps: false },
);

const questionsAnswersJoiScheama = Joi.object({
  answers: Joi.array().items({
    _id: Joi.string().hex().length(24),
    answer: Joi.string().required(),
  }),
});

const questionsJoiSchemas = {
  answers: questionsAnswersJoiScheama,
};

const Question = model('question', questionSchema);

module.exports = { questionsJoiSchemas, Question, questionTypes };
