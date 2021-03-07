const express = require("express");
const mongoose = require("mongoose");
const FoodModel = require("./models/Food");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://newuser:QmgAtQR3E9141RcA@crud.s5j2e.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });

  try {
    await food.save();
  } catch (err) {
    console.error(err);
  }
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.save();
      res.send("update");
    });
  } catch (err) {
    console.error(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await (await FoodModel.findByIdAndRemove(id)).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("Server running on port 3001.");
});

//QmgAtQR3E9141RcA
