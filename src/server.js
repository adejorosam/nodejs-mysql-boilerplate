const path = require('path');
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const morgan = require('morgan')
const colors = require('colour')
const db = require('./config/db')
const handleError = require('./utils/error')
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware')


// Load env vars
dotenv.config({ path: './config/config.env' });


// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))


// Route files
const authRoutes = require("./routes/user");

const authMiddleware = require('./middleware/authMiddleware');
const app = express();

// Body parser
app.use(express.json());



// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}



// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/home', (req, res)  => {
  return res.json("Welcome")
})


app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});