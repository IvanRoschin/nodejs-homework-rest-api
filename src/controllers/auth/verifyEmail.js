const { User } = require("../../models");
const { NotFound } = require("http-errors");
const fs = require("fs");
const path = require("path");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw NotFound("User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  const filePath = path.join(__dirname, "verifyEmail.html");
  fs.readFile(filePath, "utf8", (err, html) => {
    if (err) {
      throw err;
    }
    res.send(html);
  });

  // (`<!DOCTYPE html>
  // <html>
  //     <h1>Verification sucess</h1>
  //     <a href="http://localhost:3000/phonebook-frontend/auth">Login link</a>
  // </html>`);
};

module.exports = { verifyEmail };
