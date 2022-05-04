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
    questionId: {
      type: Number,
      required: true,
    },
    rightAnswer: {
      type: String,
      required: true,
    },
    answers: {
      type: [{ type: String }],
      required: true,
    },
  },
  { versionKey: false, timestamps: false },
);

const questionsAnswersJoiScheama = Joi.object({
  answers: Joi.array().items({
    questionId: Joi.number().required(),
    answer: Joi.string().required(),
  }),
});

const questionsJoiSchemas = {
  answers: questionsAnswersJoiScheama,
};

const Question = model('question', questionSchema);

module.exports = { questionsJoiSchemas, Question, questionTypes };
