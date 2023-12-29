import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true,"Please provide a username."]
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
    },
    image:{
        type:String,
    },
    role:{
      type:String,
      default:'user',
    },
    emailVerified:{}

}, {timestamps: true});


export const User =  mongoose.models.User || mongoose.model('User', userSchema);