const User = require("../models/User");
const createSendToken = require("../middleware/createSendToken");
const crypto = require("crypto");
const ErrorResponse = require("../utils/ErrorResponse");
const catchAsync = require("../middleware/catchAsync");
const jwt = require("jsonwebtoken");
// register user
exports.register = catchAsync(async (req, res, next) => {
  if (!req.body)
    return next(new ErrorResponse("please enter informations", 400));
  const user = await User.create(req.body);
  if (!user) return next(new ErrorResponse("please try again", 400));
  createSendToken(user, 200, res);
});
// login
exports.login = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password)))
    return next(new ErrorResponse("email or password incorrect", 400));
  createSendToken(user, 200, res);
});
// protect links
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) return next(new ErrorResponse("please login again", 400));
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) return next(new ErrorResponse("pleaese login again 2 ", 400));
  if (user.checkToken(decoded.iat))
    return next(new ErrorResponse("please login again", 400));
  req.user = user;
  next();
});
exports.logout = (req, res, next) => {
  res
    .cookie("jwt", "", {
      httpOnly: true,
      maxAge: 10,
    })
    .status(200)
    .json({
      status: "success",
      message: "loggedout successfully",
    });
};

// get personal profile
exports.getProfile = (req, res, next) => {
  try {
    if (!req.user) throw new Error("please login");
    res.status(200).json({
      status: "success",
      user: req.user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
