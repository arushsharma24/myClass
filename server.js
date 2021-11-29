import express from "express";
import mongoose from "mongoose";
import routes from './routes/index.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

const app = express();


import keys from './configs/keys.js';
import passport from "passport";
const db = keys.mongoURI;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true    // for the deprecation warning 
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// add routes here
app.use(cors())
app.use(express.urlencoded({ extended: true}));
app.use(express.json())
app.use(routes)
app.use(userRoutes)
app.use(passport.initialize())

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
