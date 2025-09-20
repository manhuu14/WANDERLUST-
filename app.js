if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
console.log(process.env.SECRET);
const express = require("express"); 
const app = express();//app.set(8080)
const mongoose = require("mongoose");  //database
const path=require("path");//ejs  
const ejsMate = require("ejs-mate");//ejs-mate
const methodOverride=require("method-override");
const ExpressError=require("./utils/ExpressError.js");  
const session = require("express-session"); 
const MognoStore=require("connect-mongo");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const flash= require("connect-flash");


// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'; 

const dburl=process.env.ATLASDB_URL;

const listingRouter = require("./routes/listing.js"); 
const reviewsRouter=require("./routes/review.js");
const userRouter = require("./routes/user.js");
const MongoStore = require("connect-mongo");



main() 
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    }); 

async function main() {
    await mongoose.connect(dburl);
}
//use for the ejs requiring
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
//use for params 
app.use(express.urlencoded({extended: true}));//use for rendering data from the parameters
app.use(methodOverride("_method")); 
app.engine('ejs',ejsMate);//ejs-mate;
app.use(express.static(path.join(__dirname,"/public")));//use for connecting the css files in this project 

const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    }, 
    touchAfter:24*3600,
}); 

store.on("error",()=>{
    console.log("Error in Mongo Session Store",err);
})

const sessionOptions={ 
    store,
    secret:process.env.SECRET,

    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 *24*60*60*1000,
        maxAge :7 *24*60*60*1000,
        httpOnly:true,
    }
};  
 
// app.get("/", (req, res) => {
//     res.send("Hi, I am root");
// });  

app.use(session(sessionOptions)); 
app.use(flash()); 

app.use(passport.initialize());
app.use(passport.session());  
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser=req.user;
    next();
}); 

// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"student@gmail.com",
//         username:"delta-student",
//     }); 

//     let registeredUser = await User.register(fakeUser,"helloworld"); 
//     res.send(registeredUser);
// });

app.use("/listings",listingRouter); 
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);



app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"}=err;
    res.status(statusCode).render("error.ejs",{err});
});


app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
