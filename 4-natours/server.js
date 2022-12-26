const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });
// console.log(process.env.NODE-ENV);
// dotenv.config({ path: path.resolve(__dirname, './config.env') })
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Hosted Database version
// mongoose.connect(DB, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// }).then(() =>console.log("DB connection successfully"))

// Local database version

mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
  
}).then(() =>console.log("DB connection successfully"))

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {                  // This is the schema type object
    type: Number,
    required: [true, "A tour must have a price"]
  }
});

const Tour = mongoose.model("Tour",tourSchema);

const testTour = new Tour({
  name: "The Park Camper",
  price: 997
})
testTour.save().then(doc =>{
  console.log(doc);
}).catch(err => console.log("ERROR: " , err))
// console.log(app.get('env'));
// console.log(process.env);

//  Start  server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
