const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   // reference to the User Collection 
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{Value} is incorrect status tpe`,
      },
    },
  },
  {
    timestamps: true,
  },
);




// connectionRequest.find(fromUserId : 342435820093242903 , toUserId : 234092590232350230)

connectionRequestSchema.index({fromUserId: 1, toUserId: 1})


// connectionRequestSchema.pre("save", function (next) {
//   const connectionRequest = this;

//   // check if the fromUserId is same as toUserId
//   if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
//     throw new Error("Cannot send connection request to yourself!");
//   }

//   next();
// });
 

// ✅ Should be like this




const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = ConnectionRequestModel;
