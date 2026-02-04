const express = require('express');

const app = express();


app.use("/user", (req,res)=> {
    res.send("AHAHAHHAHAHAAHH")        // this will always run even after specific method routes becuase of app.use and order matters . 
})


app.get("/user",(req,res)=> {
   res.send({
     firstName : "anuj",
     lastName : "jain"
   })
})


app.post("/user", (req,res)=> {

   res.send(
     "Data saved successfully" 
   )
})


app.delete("/user", (req,res)=> {
   res.send("Deleted user sucesfully")
})

app.use("/test",(req,res)=>{
   res.send(" hello from the server")
})


// app.use("/hello",(req,res)=> {
//     res.send("Hello World!")
// })

// app.use("/",(req,res)=>{
//     res.send("Welcome to the Home Page")
// })


app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
})

