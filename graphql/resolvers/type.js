const Type = require('../../models/type')
const HttpError = require('../../models/httperror')

const getType = args => {
    return new Type({
        _id: args.type._id,
        name: args.type.name
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
    }
}
