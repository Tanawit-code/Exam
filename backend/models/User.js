import { Timestamp } from "bson";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String ,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
    },
    { Timestamp : true}
);

const User = mongoose.model("User", userSchema);
export default User;s   