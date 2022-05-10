const express = require("express");
const requestModel = require("../models/requests");
const app = express();

app.post("/requests", async (req, res) => {
      const request = new requestModel(req.body);
      
      try {
        await request.save();
        res.status(200).send(`Tạo request mới thành công !`);
      } catch (error) {
        res.status(500).send(error);
      }
});

app.get("/requests/all", async (req, res) => {
    const requests = await requestModel.find();
    
    try {
      res.status(200).send(requests);
    } catch (error) {
      res.status(500).send(error);
    }
})

app.post("/requests/filter", async (req, res) => {
  const filter = req.body;
  const requests = await requestModel.find({
    name: { $regex: filter.name },
    content: { $regex: filter.content },
    // date_created: { $regex: filter.date_created },
    status: { $regex: filter.status },
    author: { $regex: filter.author },
    assignee: { $regex: filter.assignee },
    category: { $regex: filter.category },
  });
  
  
  try {
    res.status(200).send(requests);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.post("/requests/update", async (req, res) => {
  const update = req.body;
  const request = await requestModel.findByIdAndUpdate({_id: update._id}, {
            name: update.name,
            content: update.content,
            category: update.category,
            assignee: update.assignee,
            status: update.status
  });
  
  
  try {
    res.status(200).send(request);
  } catch (error) {
    res.status(500).send(error);
  }
})

module.exports = app;