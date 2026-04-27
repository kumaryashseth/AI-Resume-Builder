import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
{
  userId:{
    type:String,
    required:true
  },
  fullName:String,
  email:String,
  phone:String,
  summary:String,
  skills:[String],
  education:[String],
  experience:[String],
  projects:[String]
},
{ timestamps:true }
);

export default mongoose.model("Resume", resumeSchema);