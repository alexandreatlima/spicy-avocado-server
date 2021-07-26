const mongoose = require("mongoose");
const Content = require("./models/Content.model.js");
const MONGODB_URI = "mongodb://localhost:27017/spicy-avocado";
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    // return self.connection.dropDatabase();
  })
  .then(() => {
    Content.updateMany({}, { $set: { type: "movie" } });
  });
module.exports = Content;
