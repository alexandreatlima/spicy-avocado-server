require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db.config")();

const app = express();

app.use(express.json());
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
app.use(cors({ origin: process.env.REACT_APP_URL }));

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

const commentsRouter = require("./routes/comments.routes");
app.use("/api", commentsRouter);

const watchlistRouter = require("./routes/watchlist.routes");
app.use("/api", watchlistRouter);

const contentRouter = require("./routes/content.routes");
app.use("/api", contentRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
