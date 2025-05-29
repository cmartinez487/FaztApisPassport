import {model, Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    email: string;
    passport: string;
    comparePassword(plainPassport: string, hashedPassport: string): Promise<boolean>;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    passport: {
        type: String,
        required: true
    }
})

// Method to encrypt the passport
userSchema.pre<IUser>('save', async function(next) {
    const user = this;

    if (!user.isModified('passport'))  return next();  

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.passport, salt);

    user.passport = hash;
    next(); 
});

// Method to compare the password
userSchema.methods.comparePassword = async function(plainPassport: string, hashedPassport: string): Promise<boolean> {
    if (!plainPassport || !hashedPassport) {
        throw new Error("passport and hash must be provided.");
    }

    return await bcrypt.compare(String(plainPassport), String(hashedPassport));
}

export default model<IUser>('User', userSchema);