import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import config from '../config/config';

const opt:StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

//new Strategy()