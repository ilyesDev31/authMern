module.exports = (user, statusCode, res) => {
  const token = user.signToken(user._id);
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  };

  res.cookie("jwt", token, options).status(statusCode).json({
    status: "success",
    user,
  });
};
