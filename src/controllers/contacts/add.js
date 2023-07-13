const { Contact } = require("../../models");

const add = async (req, res) => {
  console.log(req.body, "req.body");
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(newContact);
};

module.exports = { add };
