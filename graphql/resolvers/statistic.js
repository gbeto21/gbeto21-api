const Statistic = require('../../models/statistic')
const HttpError = require('../../models/httperror')
const auth = require('../../middleware/checkAuth')

const getStatistic = args => {
    return new Statistic({
        _id: args.statisticInput._id,
        name: args.statisticInput.name,
        value: args.statisticInput.value,
        icon: args.statisticInput.icon
    })
}

module.exports = {
    statistics: async () => {
        try {
            return await Statistic.find()
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not get the statistics.', 500)
        }
    },
    createStatistic: async (args, req) => {
        auth.validateUserIsAuthenticated(req)
        try {
            let result = await getStatistic(args).save()
            return {
                ...result._doc,
                _id: result._doc._id.toString()
            }
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not create the statistic.', 500)
        }
    },
    updateStatistic: async (args, req) => {
        auth.validateUserIsAuthenticated(req)
        try {
            return await
                Statistic.findOneAndUpdate(
                    { _id: args.statisticInput._id },
                    getStatistic(args),
                    { new: true }
                )
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not update the statistic.', 500)
        }
    },
    deleteStatistic: async (args, req) => {
        auth.validateUserIsAuthenticated(req)
        try {
            return await Statistic.findOneAndDelete({ _id: args._id })
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not delete the statistic.', 500)
        }
    }
}