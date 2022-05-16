const { User } = require('../../models/user');

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { token: '' });
  res.status(204).send();
};

module.exports = logoutUser;
