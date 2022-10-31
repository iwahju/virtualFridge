const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const model = require("./models/user");

app.listen(1337, () => {
  console.log("Server is running on port 1337");
});

app.use(cors());
app.use(express.json());

//mongoose.connect("mongodb+srv://test:123@cluster0.rzqbkgt.mongodb.net/?retryWrites=true&w=majority");
//mongoose.connect("mongodb+srv://andrewg3:Sshdwrnd1@cluster0.sx6hgc8.mongodb.net/test");

mongoose.connect(
  "mongodb+srv://test:123@cluster0.kqe5gb7.mongodb.net/mern?retryWrites=true&w=majority"
);

app.get("/getItems", (req, res) => {
  model.find({ Users: "fridge" }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await model.create({
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
  const user = await model
    .findOne({
      email: req.body.email,
      password: req.body.password,
    })
    .select("-password");
  if (user) {
    return res.json({ status: "ok", user: user });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/addToFridge", async (req, res) => {
  const user = await model.findOne({
    email: req.body.email,
  });

  //console.log(user);

  user.fridge.push(req.body.item);
  console.log(req.body.item);
  console.log(user.name);
  model.updateOne(
    { email: req.body.email },
    { fridge: user.fridge },
    (err, result) => {}
  );
  if (user) {
    return res.json({ status: "ok", user: user });
  } else {
    return res.json({ status: "error", user: false });
  }
});
