const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const uri = "mongodb://localhost:27017/menu";
const productsRoute = require("./route/allProducts");
// create our express app
const app = express();
// middleware
app.use(bodyParser.json());
app.use(cors())
// routes
app.use('/api', productsRoute);
//Connect to mongodb
mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch(err => console.log(err))

// Use static folder on production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));
    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}
//start server
app.listen(3000, () => {
    console.log("Listeniing at port: 3000");
})