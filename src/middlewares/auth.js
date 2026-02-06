 const adminAuth = (req,res, next) => {
  console.log("admin auth is getting checked")
  const token = "xsyz"

  const isAdminAuthenticated = token === "xyz"
  if(!isAdminAuthenticated){
     res.status(401).json({message: "Unauthorized"})
  }  else{
    next()
  }
};



 const userAuth = (req,res, next) => {
  console.log("admin auth is getting checked")
  const token = "xyz"

  const isAdminAuthenticated = token === "xyz"
  if(!isAdminAuthenticated){
     res.status(401).json({message: "Unauthorized"})
  }  else{
    next()
  }
};


module.exports = {  
  adminAuth, userAuth
}