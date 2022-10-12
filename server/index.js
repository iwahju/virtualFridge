const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require('./models/user.model')

app.use(cors());
app.use(express.json());
//123
mongoose.connect("mongodb+srv://test:123@cluster0.rzqbkgt.mongodb.net/?retryWrites=true&w=majority");

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
});
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  }).select("-password");
  if (user) {
    return res.json({status: "ok", user: user});
  } else {
    return res.json({status: "error", user: false })
  }
});

app.listen(1337, () => {
  console.log("Server startes on 1337");
});
