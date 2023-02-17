const {
  Contact,
  joiPostSchema,
  joiPutSchema,
  joiPatchSchema,
} = require("./contact");
const {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
  joiUpdateAvatarSchema,
} = require("./user");

module.exports = {
  Contact,
  joiPostSchema,
  joiPutSchema,
  joiPatchSchema,
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
  joiUpdateAvatarSchema,
};