import mongoose from "mongoose";
//on use le schema de mongoose pour manipuler database
const { Schema } = mongoose;
// les proprietes du database
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 16,
        validate: {
            validator : (password)=>{
                //check au moins une lettre minuscule
                return /[a-z]/.test(password);
            }, message: "password doit contenir au moins une minuscule."
        }
    },
    address: {
        type : String,
        trim : true,
    },
    role: {
        type: Number,
        default: 0,
    },

}, {timestamps: true})

export default mongoose.model("User", userSchema);