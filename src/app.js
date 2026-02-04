const express = require('express');

const app = express();


app.get("/user/:userId/:name/:password", (req,res)=> {
   console.log(req.params.name);
    console.log(req.params.userId);
    console.log(req.params.password);

    // above we saw how to get data from the url using req.params. 
   res.send("User data received");
})


app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
})

