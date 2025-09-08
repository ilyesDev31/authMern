const express = require("express");
const app = express();
const hpp = require("hpp");
const cors = require("cors");
const limit = require("express-rate-limit");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(cookieParser());
app.use(hpp());
app.use(helmet());
app.use(
  cors({
    origin: "https://authern.netlify.app",
    credentials: true, // This allows cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
const limiting = limit({
  max: 10,
  windowMs: 10 * 60 * 1000,
  message: "please try again later",
});
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve().replace("server");
  app.use(express.static(path.join(__dirname, "client", "dist")));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}
app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);
module.exports = app;
