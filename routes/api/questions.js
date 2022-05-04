const express = require('express');
const questionsCtrl = require('../../controllers/questions');
const { ctrlWrapper, authenticate, validation } = require('../../middleware');
const { questionsJoiSchemas } = require('../../models/question');

const router = express.Router();

router.get('/theory', authenticate, ctrlWrapper(questionsCtrl.getQuestions));

router.get('/tech', authenticate, ctrlWrapper(questionsCtrl.getQuestions));

router.post(
  '/tech-results',
  authenticate,
  validation(questionsJoiSchemas.answers),
  ctrlWrapper(questionsCtrl.getResults),
);

router.post(
  '/theory-results',
  authenticate,
  validation(questionsJoiSchemas.answers),
  ctrlWrapper(questionsCtrl.getResults),
);

module.exports = router;
