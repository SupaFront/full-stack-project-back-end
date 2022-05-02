const { User } = require('../../models/user');

const logoutUser = async (req, res) => {
  const { id } = req.user;
  User.findByIdAndUpdate(id, { token: '' });
  res.status(204).send();
};

module.exports = logoutUser;
