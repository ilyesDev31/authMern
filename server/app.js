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
app.use(hpp());
app.use(helmet());
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://authern.netlify.app", "http://localhost:5173"],
    credentials: true, // This allows cookies to be sent
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
// serve static assets if in prod
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/dist"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
//   });
// }
app.use(errorHandler);
module.exports = app;
