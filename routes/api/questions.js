const express = require('express');
const questionsCtrl = require('../../controllers/questions');
const { ctrlWrapper, authenticate, validation } = require('../../middleware');
const { questionsJoiSchemas } = require('../../models/question');

const router = express.Router();

router.get('/:type', authenticate, ctrlWrapper(questionsCtrl.getQuestions));

router.post(
  '/results/:type',
  authenticate,
  validation(questionsJoiSchemas.answers),
  ctrlWrapper(questionsCtrl.getResults),
);

module.exports = router;
