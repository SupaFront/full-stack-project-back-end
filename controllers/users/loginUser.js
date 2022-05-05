const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { createError } = require('../../middleware');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401);
  }
  const compareResult = await bcrypt.compare(password, user.password);
  if (!compareResult) {
    throw createError(401);
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token, userData: { email: user.email, _id: user._id } });
};
module.exports = loginUser;
