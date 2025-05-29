import { Request, Response } from 'express';
import User, {IUser} from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/config';

function createToken(user: IUser): string {

    const token =  jwt.sign({
        id: user._id,
        email: user.email
    }, config.jwtSecret)

    return token;
}

export const signUp = async (req: Request, res: Response) : Promise<void> => {

    if (!req.body.email || !req.body.passport) {
        res.status(400).json({ msg: 'Please, send your email and pass' });
    }
    const user = await User.findOne({ email: req.body.email })

    if (user) {
        res.status(400).json({ msg: 'User already exists' });
    } else {
        const newUser = new User(req.body);

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }    
    res.send('signup')
}

export const signIn = async (req: Request, res: Response) : Promise<void> => {

    if (!req.body.email || !req.body.passport) {
        console.log(req.body);
        res.status(400).json({ msg: 'Please, send your email and pass' });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user){
        res.status(400).json({ msg: 'User does not exist' });
    }
    else{
        const isMatch = await user.comparePassword(String(req.body.passport), String(user.passport));
        if (isMatch) {
            const token = createToken(user)
            res.status(200).json({msg : 'User authenticated', token: token, user: user});
        }
        else {
            res.status(400).json({ msg: 'Invalid passport' });
        }
    }
}