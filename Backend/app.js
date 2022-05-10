const express = require('express')
const app = express()
const port = 5000
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./controllers/userController")
const request = require("./controllers/requestController")
//middleware
app.use(express.json());
app.use(cors());
app.use(user);
app.use(request);

mongoose.connect('mongodb+srv://hedspier:XxX1234567@cluster0.tqnlu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`App listening on port ${port}!`))