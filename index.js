var express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l47bs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

var app = express()
app.use(bodyParser.json());
app.use(cors());


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const movieCollection = client.db(`${process.env.DB_NAME}`).collection("AllMovies");
  const bookingCollection = client.db(`${process.env.DB_NAME}`).collection("AllBooking");
  // perform actions on the collection object
 
     //Add new movie 
     app.post('/addNewMovie', (req, res) => {
        const newMovie = req.body;
        movieCollection.insertOne(newMovie)
        .then(result => {
          res.send(result.insertedCount > 0)
        })
      })

      //Get all movie
      app.get('/allMovies', (req, res) => {
        movieCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
            })
      })

       //Add new booking
     app.post('/bookSeat', (req, res) => {
        const newBooking = req.body;
        bookingCollection.insertOne(newBooking)
        .then(result => {
          res.send(result.insertedCount > 0)
        })
      })

});

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(5000)