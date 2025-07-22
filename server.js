const express = require('express');
const cors = require('cors');

require('dotenv').config(); 
const connectDB = require('./connectmongo');

const app = express();

app.use(cors({
  origin: "*", // or use specific domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json()); 
connectDB();

app.get('/check', (req, res) => {
  res.send("Everything working well");
});

app.use('/api/preferences', require('./routes/preferences'));


app.listen(process.env.PORT, () => console.log("Server is running at port 4000"));
