const router = require("express").Router();

const {
  login,
  register,
  protect,
  logout,
  getProfile,
} = require("../controllers/authControllers");
router.route("/login").post(login);
router.route("/register").post(register);
router.get("/profile", protect, getProfile);
router.post("/logout", protect, logout);

module.exports = router;
