const Statistic = require('../../models/statistic')
const HttpError = require('../../models/httperror')

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
    createStatistic: async args => {
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
    }
}