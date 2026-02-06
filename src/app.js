const express = require("express");

const app = express();
const {adminAuth , userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth)



app.get("/admin/getalldata", (req,res)=> {
     res.send("All data send")
})

app.get("/user", userAuth, (req,res)=> {
        res.send("User data sent")
})





app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
