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
    },
    createTechnology: async args => {
        try {
            let result = await getTechnology(args).save()
            return {
                ...result._doc,
                _id: result._doc._id.toString()
            }
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not create the technology.', 500)
        }
    },
    updateTechnology: async args => {
        try {
            return await Technology.findOneAndUpdate(
                { _id: args.technologyInput._id },
                getTechnology(args),
                { new: true }
            )
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not update the technology.', 500)
        }
    }
}