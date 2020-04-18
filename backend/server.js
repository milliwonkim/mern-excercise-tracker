const express = require('express');
/**Cross-Origin Resource Sharing(CORS) allows AJAX requests
 * to skip the Same-origin policy and access resources from remote hosts.
 * */
const cors = require('cors');
const mongoose = require('mongoose');

/**dotenv loads environment variables from a '.env' file into process.env 
 * which makes development simpler.
 * instead of setting environment variables on our development machine,
 * they can be stored in a file
 * so we will create the .env file later.
*/
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// we will be sending and receiving JSON
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});