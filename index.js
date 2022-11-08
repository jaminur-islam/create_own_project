const express = require("express");
const app = express();
const cors = require("cors");
const { createUser, userChecker } = require("./controller/userController");
const { errorHandler, notFound } = require("./middleware/common/errorHandler");
const postRouter = require("./router/postRouter");
const userRouter = require("./router/userRouter");
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send(" Hi jaminur");
});

app.post("/user", userChecker, createUser);
app.use("/user", userRouter);
app.use("/post", postRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("server listing port 5000");
});

/* 
app.get("/p", (req, res) => {
  res.send(a);
});

app.get(
  "/s",
  (req, res, next) => {
    fs.readFile("./noteFile.txt", (err, data) => {
      if (err) {
        console.log(data);
        next(err);
      } else {
        req.data = data;
        next();
      }
    });
  },
  (req, res, next) => {
    console.log("Hi");
    res.send(req.data.toString());
  }
); */
