const mongoose = require('mongoose');
const Tour = require('./models/tourModel')
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
