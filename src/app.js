import express from 'express';
import defaultRouter from './routers/routes.js';
import session from 'express-session';
import dotenv from 'dotenv';


dotenv.config();

const SECRET = process.env.SESSION_SECRET;

//configure Express.js app
const app = express();



//view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

//static directories
app.use(express.static('public'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session first
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))

// attach user to every request second
app.use((req, res, next) => {
    if(req.session.user) {
        req.user = req.session.user;
    }else{
        req.user = null;
    };
    next();
})




//routers
app.use("/", defaultRouter);

export default app;