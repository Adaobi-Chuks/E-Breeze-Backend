import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
  }
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const update: any = this.getUpdate();
    let passwordHash;
    
    //Only hash the password when the password field is to be updated to avoid rehashing already hashed password
    if (update.$set.password) {
        const salt = await bcrypt.genSalt(10);
        passwordHash = await bcrypt.hash(update.$set.password, salt);
        update.$set.password = passwordHash;
    }
    
    update.$set.updatedAt = new Date();
    next();
});
const User = model("user", userSchema);
export default User;