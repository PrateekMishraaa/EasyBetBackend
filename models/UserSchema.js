import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
    UserName: {
        type: String,
        required: true,
        unique: [true, "This username is already taken"]
    },
    FullName: {  // Fixed: Changed from "FUllName" to "FullName"
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: [8, "Password must contain at least 8 characters"],
        maxlength: [255, "Password should not be more than 255 characters"]
    }
}, {
    timestamps: true
});

// Pre-save middleware to hash password
UserSchema.pre('save', async function() {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('Password')) {
        return 
        // next();
    }
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.Password = await bcrypt.hash(this.Password, salt);
        // next();
    } catch (error) {
      
    }
});


const User = mongoose.model("User", UserSchema);
export default User;