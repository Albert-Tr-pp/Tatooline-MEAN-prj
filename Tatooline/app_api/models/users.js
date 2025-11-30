const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongooseModule = require('passport-local-mongoose');
const passportLocalMongoose =
  passportLocalMongooseModule.default || passportLocalMongooseModule;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
