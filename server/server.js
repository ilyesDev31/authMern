require("dotenv").config({
  path: "./.env",
});
const mongoose = require("mongoose");
const app = require("./app");

(async () => {
  try {
    const dbStr = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);
    await mongoose.connect(dbStr);
    console.log("database connected");
  } catch (error) {
    console.log(error.message);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server listening on port ${PORT}`));
