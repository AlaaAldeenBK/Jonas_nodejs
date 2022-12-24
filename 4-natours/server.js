const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });
// console.log(process.env.NODE-ENV);
// dotenv.config({ path: path.resolve(__dirname, './config.env') })
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con =>{
  console.log(con.connections)
  console.log("DB connection successfully")
})

// console.log(app.get('env'));
// console.log(process.env);

//  Start  server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
