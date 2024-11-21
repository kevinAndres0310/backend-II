import passport from 'passport';
import jwt from 'passport-jwt';
import dotenv from 'dotenv';

dotenv.config();

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['currentUser'];
  }
  return token;
};

const initializePassport = () => {
  passport.use(
    'jwt',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SECRET_KEY,
      },
      async (payload, done) => {
        try {
          return done(null, payload);
        } catch (error) {
          done(error);
        }
      },
    ),
  );
};

export default initializePassport;
