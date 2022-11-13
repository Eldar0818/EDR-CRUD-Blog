const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initializePassport(passport, getUserByEmail, getUserById) {
    const authenticater = async(email, password, done)=> {
        const user = await getUserByEmail(email)
        if(user === null){
            return done(null, false, { message: "User not found!" })
        }

        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, { message: "Incorrect password!" })
            }
        } catch (error) {
            return done(error)
        }

    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticater))
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((id, done) => { 
        return done(null, getUserById(id))
     })
}

module.exports = initializePassport