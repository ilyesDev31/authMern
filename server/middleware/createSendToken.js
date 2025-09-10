module.exports = (user, statusCode, res) => {
  const token = user.signToken(user._id);
  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "none",
  };
  res.cookie("jwt", token, options).statusCode(statusCode).json({
    status: "success",
    user,
  });
};
