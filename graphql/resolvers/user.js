const User = require('../../models/user')
const HttpError = require('../../models/httperror')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getUser = args => {

    return new User({
        email: args.userInput.email,
        password: args.userInput.password
    })
}

module.exports = {
    createUser: async args => {
        try {
            let users = await User.find()
            let usersExists = users.length > 0
            if (usersExists) {
                return new HttpError('An user already exist. Please login.', 500)
            }

            let user = getUser(args)
            user.password = await bcrypt.hash(user.password, 12)
            let result = await user.save()
            return {
                _id: result._doc._id.toString(),
                email: result._doc.email
            }
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not create the user.', 500)
        }
    },
    login: async ({ email, password }) => {
        try {
            let user = await User.findOne({ email: email })
            if (!user) {
                return new HttpError('Invalid credentials.', 403)
            }
            let passwordsMatch = await bcrypt.compare(password, user.password)
            if (!passwordsMatch) {
                return new HttpError('Invalid credentials.', 403)
            }

            let token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email
                },
                `${process.env.SECRET_WORD}`,
                { expiresIn: '1h' }
            )

            return { userId: user.id, token: token, tokenExpiration: 1 }

        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not login the user.', 500)
        }
    }
}

