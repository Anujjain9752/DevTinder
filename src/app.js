const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json()); // to parse incoming JSON data , this is a middleware provided by express to parse the incoming request body as Json

// get user by email id
app.get("/user", async (req, res) => {
  const email = req.body.emailId;

  const user = await User.find({ emailId: email });

  if (user.length === 0) {
    res.status(404).json({ message: "User not found" });
  } else {
    console.log(user);
    res.status(200).json({ message: "User found", user });
  }
});

// find by ID

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    console.log(user);
    res.status(200).json({ message: "User found", user });
  }
});

//feed api
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching feed", error: err.message });
  }
});

app.post("/signup", async (req, res) => {
 try {
  // validate the incoming data
  validateSignUpData(req);

  const {firstName,lastName,emailId,password} = req.body;

// Encrpyt the passowrd now we will do it as now out data is validated
   
   const passwordHash = await bcrypt.hash(password, 10);

   
  // creating a new instance of the user model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });

    console.log(user);

 
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).json({ message: "Error adding user", error: err.message });
  }
});


app.post("/login", async (req, res) => {
  
  try{
     const { emailId, password } = req.body;

     // you can check for the email id 


     // first we check if email id exists in the database or not if it does not exist we will return an error message

     const user = await User.findOne({ emailId: emailId });

      if (!user) { 
        throw new Error("Invalid email or password");
      }





     // there is a fucntion to write we call it bcrypt.compare() it will compare the password with the hash password stored in the database and return true or false

     const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) { 
        throw new Error("Invalid email or password");
      } else {
        res.status(200).json({ message: "Login successful", user });
      }



  }catch(err){
    res.status(400).json({ message: "Error logging in", error: err.message });
  }

})

//update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [ "photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("Invalid updates");
    }

    if(data?.skills.length > 10){
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating user", error: err.message });
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
