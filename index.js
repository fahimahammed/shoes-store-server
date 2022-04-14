const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zpqcv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('working')
})


client.connect(err => {
    const shoesCollection = client.db("shoeStore").collection("shoes");

    app.get('/shoes', (req, res) => {
        shoesCollection.find()
        .toArray((err, items) => {
            res.send(items);
            //console.log(items);
        })
    })
})

app.listen(port, ()=>{
    console.log("listening")
});