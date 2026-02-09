const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");



profileRouter.get("/profile", userAuth, async(req,res) => {
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





module.exports = profileRouter;