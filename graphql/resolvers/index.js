const skillResolver = require('./skill')
const typeResolver = require('./type')
const statisticResolver = require('./statistic')

const rootResolver = {
    ...skillResolver,
    ...typeResolver,
    ...statisticResolver
}

module.exports = rootResolver