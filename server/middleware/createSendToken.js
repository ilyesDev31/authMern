module.exports = (user, statusCode, res) => {
  const token = user.signToken(user._id);
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
    domain:
      process.env.NODE_ENV === "production"
        ? "https://https://authern.netlify.app"
        : "",
  };

  res.cookie("jwt", token, options).status(statusCode).json({
    status: "success",
    user,
  });
};
