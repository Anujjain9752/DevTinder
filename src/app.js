const express = require("express");

const app = express();
  

app.get("/getuserdata", (req,res)=> {
    try{


    res.send("User data sent")
    }catch(err){
       res.status(500).json({message: "Something went wrong"}) // log your error // send generic message to client
    }
    // logic of db call and get user data
    
})


app.use("/", (error,req,res, next)=> {
    if (err) {
        // log your errors
        res.status(500).json({message: "Something went wrong"})
    }
})



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
