const messages = ['Bad', 'Bad', 'Not so good!', 'Good!', 'Very good!', 'Excellent!'];
const secondMessages = [
  'You have very low QA knowledge',
  'You have weak QA knowledge',
  'You have normal QA knowledge',
  'You have high QA knowledge',
  'You have amazing QA knowledge',
];

const createResultMessage = (qtyOfAllAnswers, rightAnswers) => {
  const percentage = Math.round((rightAnswers / qtyOfAllAnswers) * 100);
  const result = Math.floor(percentage / 20);
  const resultMessage = {
    result: `${percentage}% `,
    mainMessage: messages[result],
    secondaryMessage: secondMessages[result],
  };

  return resultMessage;
};

module.exports = createResultMessage;
