require('dotenv').config();

// Security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const connectDB = require('./db/connect');
//const myclass = require('./models/class');
//const student = require('./models/student');

const express = require('express');
const app = express();

//my routers
const authRouter = require('./routes/auth');
const studentsRouter = require('./routes/students');

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/students', studentsRouter);


app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
