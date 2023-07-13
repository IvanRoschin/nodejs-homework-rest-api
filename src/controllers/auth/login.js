const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("User not found");
  } else if (!user.verify) {
    throw new Unauthorized(`Email is not verified`);
  } else if (!user.comparePassword(password)) {
    throw new Unauthorized(`Password is incorrect`);
  }

  const subscription = user.subscription;
  const name = user.name;
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      name,
      email,
      subscription,
      avatarURL: user.avatarURL,
      id: user._id,
    },
  });
};

module.exports = { login };
