const getCurrentUser = async (req, res) => {
  const { email, _id } = req.user;
  res.status(200).json({ email, _id });
};

module.exports = getCurrentUser;
