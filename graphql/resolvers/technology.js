const Technology = require('../../models/technology')
const HttpError = require('../../models/httperror')

const getTechnology = args => {
    return new Technology({
        _id: args.technologyInput._id,
        name: args.technologyInput.name
    })
}

module.exports = {
    technologys: async () => {
        try {
            return await Technology.find()
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not get the technologys.', 500)
        }
    }
}