import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import config from '../config/config';
import User from '../models/user';

const opt:StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

export default new Strategy(opt, async (payload, done) => {

    try {
        const user = await User.findById(payload.id);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    }
    catch (error) {
        console.error('Error in Passport Strategy:', error);
        done(error, false);
    }
    
});