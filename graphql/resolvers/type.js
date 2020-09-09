const Type = require('../../models/type')
const HttpError = require('../../models/httperror')

const getType = args => {
    return new Type({
        _id: args.typeInput._id,
        name: args.typeInput.name
    })
}

module.exports = {
    types: async () => {
        try {

            let res = await Type.find()
            console.log(res);
            return res
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not get the types.', 500)
        }
    },
    createType: async (args) => {
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
    }
}
