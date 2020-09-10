const User = require('../../models/user')
const HttpError = require('../../models/httperror')
const bcrypt = require('bcryptjs')

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
    }
}

