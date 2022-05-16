const { createError } = require('../../middleware');
const { User } = require('../../models/user');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw createError(409);
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({ email, password: hashPassword });
  res.status(201).json({ email: newUser.email, _id: newUser._id });
};

module.exports = registerUser;
