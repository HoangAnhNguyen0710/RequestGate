const express = require("express");
const userModel = require("../models/users");
const app = express();
const bcrypt = require("bcrypt");


app.post("/users/login", async (req, res) => {
  
  const user = await userModel.findOne({email: req.body.email});
  if(!user) return res.status(400).send("Invalid email");
  else{
    bcrypt.compare(req.body.password, user.password, (err, isValid) => {
      if(isValid) return res.status(200).send(user);
      else return res.status(400).send("Invalid password");
    })
  }

});

app.post("/users", async (req, res) => {
  const checkUser = await userModel.findOne({email: req.body.email})
  if(!checkUser){
    // console.log(req.body)
    const user = new userModel(req.body);
    
    try {
      await user.save();
      // res.send(user);
      res.status(200).send(`Tạo User mới thành công !`);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  else return res.status(400).send(`User đã tồn tại !`);
});

app.get("/users/all", async (req, res) => {
  // console.log(req.params);
  const users = await userModel.find();
  if (!users) {
    return res.status(400).send(`Not found`);
  }
  try {
    // console.log(users);
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.delete("/users/:id", async (req, res) => {
//   // console.log(req.params);
//   const id = req.params.id;
//   const del = await userModel.deleteOne({ _id: id });
//   try {
//     console.log(del);
//     res.send(del);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.put("/users/update", async (req, res) => {
  // console.log(req.params);
  const user = req.body;
  const update = await userModel.findByIdAndUpdate({_id : user._id}, {
    name: user.name,
    ma_nv: user.ma_nv,
    department: user.department,
    role: user.role,
    status: user.status
   });
  try {
    console.log(update);
    res.status(200).send(update);
  } catch (error) {
    res.status(500).send(error);
  }
})

module.exports = app;
