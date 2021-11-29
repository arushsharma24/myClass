import {Strategy} from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

import User from '../models/userModel.js';
import keys from '../configs/keys.js';
import passport from "passport";

export default function (passport) {
    var opts = {}

    opts.secretOrKey = keys.secret
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.find({
            id: jwt_payload.id
        }, function (err, user) {
                if (err) {
                    return done(err, false)
                }
                if (user) {
                    return done(null, user)
                }

                else {
                    return done(null, false)
                }
        }
        )
    }))  
}
