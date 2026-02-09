const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

app.use(cookieParser()); // to parse the cookies from the incoming request

app.use(express.json()); // to parse incoming JSON data , this is a middleware provided by express to parse the incoming request body as Json




app.get("/profile", userAuth, async(req,res) => {
    try{
        
        const user = req.user; // we have set the user in the request object in the auth middleware so we can access it here

        if(!user){
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({ message: "User found", user });
        }
      
        

    } catch(err){
        res.status(500).json({ message: "Error fetching profile", error: err.message });
    }
})

app.post("/signup", async (req, res) => {
  try {
    // validate the incoming data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrpyt the passowrd now we will do it as now out data is validated

    const passwordHash = await bcrypt.hash(password, 10);

    // creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    // console.log(user);

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).json({ message: "Error adding user", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // you can check for the email id

    // first we check if email id exists in the database or not if it does not exist we will return an error message

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // there is a fucntion to write we call it bcrypt.compare() it will compare the password with the hash password stored in the database and return true or false
    const isPasswordValid = await user.validatePassword(password); // we have defined a method in the user model to compare the password and return true or false

    
    if(isPasswordValid){
     
      // generate a jwt token
       const token =await user.getJWT(); // we have defined a method in the user model to generate a jwt token
      
      res.cookie("token", token , {
        expires: new Date(Date.now() + 8 * 3600000), 
      } ) // set the token in the cookie

      res.send("Login successful");
    } else {
      throw new Error("Invalid Credentials");
    }





  } catch (err) {
    res.status(400).json({ message: "Error logging in", error: err.message });
  }
});


app.post('/sendConnectionRequest',userAuth, async (req, res) => {
  try {

    const user = req.user; 


    res.send(user.firstName + "is sent the connection request")

 

  } catch (err) {
    res.status(400).json({ message: "Error sending connection request", error: err.message });
  }

});


connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
