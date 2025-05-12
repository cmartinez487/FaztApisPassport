import express, { Request, Response } from 'express';
import User, {IUser} from '../models/user';
import user from '../models/user';

export const signUp = async (req: Request, res: Response) : Promise<void> => {

    if (!req.body.email || !req.body.passport) {
        res.status(400).json({ msg: 'Please, send your email and pass' });
    }
    const user = await User.findOne({ email: req.body.email })

    if (user) {
        res.status(400).json({ msg: 'User already exists' });
    } else {
        const newUser = new User({
            email: req.body.email,
            passport: req.body.passport
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }   
    res.send('signup')
}

export const signIn = async (req: Request, res: Response) : Promise<void> => {

    res.send('signin')
}