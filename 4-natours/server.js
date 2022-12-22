const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

// console.log(app.get('env'));
// console.log(process.env);

//  Start  server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
