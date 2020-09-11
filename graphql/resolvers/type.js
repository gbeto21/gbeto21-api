const Type = require('../../models/type')
const HttpError = require('../../models/httperror')
const auth = require('../../middleware/checkAuth')

const getType = args => {
    return new Type({
        _id: args.typeInput._id,
        name: args.typeInput.name
    })
}

module.exports = {
    types: async () => {
        try {
            return await Type.find()
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not get the types.', 500)
        }
    },
    createType: async (args, req) => {
        auth.validateUserIsAuthenticated(req)
        try {
            let result = await getType(args).save()
            return {
                ...result._doc,
                _id: result._doc._id.toString()
            }
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not create the type.', 500)
        }
    },
    updateType: async (args, req) => {
        auth.validateUserIsAuthenticated(req)
        try {
            return await
                Type.findOneAndUpdate(
                    { _id: args.typeInput._id },
                    getType(args),
                    { new: true }
                )
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not update the type.', 500)
        }
    },
    deleteType: async (args, req) => {
        auth.validateUserIsAuthenticated(req)
        try {
            return await Type.findOneAndDelete({ _id: args._id })
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not delte the type.')
        }
    }
}
