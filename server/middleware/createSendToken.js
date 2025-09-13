module.exports = (user, statusCode, res) => {
  const token = user.signToken(user._id);
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in production
    sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };

  res.cookie("jwt", token, options).status(statusCode).json({
    status: "success",
    user,
  });
};
