import {model, Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    email: string;
    passport: string;
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

// Method to encrypt the password
userSchema.pre<IUser>('save', async function(next) {
    const user = this;

    if (!user.isModified('passport'))  return next();  

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.passport, salt);

    user.passport = hash;
    next(); 
});

// Method to compare the password
userSchema.methods.comparePassword = async function(passport:string): Promise<boolean> {
    return await bcrypt.compare(passport, this.passport)
}

export default model<IUser>('User', userSchema);