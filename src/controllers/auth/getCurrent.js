const getCurrent = async (req, res) => {
  const { name, email, subscription, avatarURL, token } = req.user;
  res.status(200).json({
    user: { name, token, email, subscription, avatarURL },
  });
};

module.exports = { getCurrent };
