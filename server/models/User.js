const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please add an email address"],
      match: [
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "please add a valid email address",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please add a password"],
      minlength: [6, "your password is too weak"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "please confirm your password"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "password and confirm password are not equal",
      },
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// hashing password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
  }

  next();
});
// set password changed at
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() + 1000;
  next();
});
// sign token
userSchema.methods.signToken = (id) => {
  console.log(id);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
// compare password
userSchema.methods.comparePassword = async function (candidate, password) {
  return await bcrypt.compare(candidate, password);
};
// check if password is changed after token were sent
userSchema.methods.checkToken = function (JWTTS) {
  if (this.passwordChangedAt) {
    return this.passwordChangedAt > JWTTS * 1000;
  }
  return false;
};
// set password reset token
userSchema.methods.createPasswordResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
