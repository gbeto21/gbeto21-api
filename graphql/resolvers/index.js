const skillResolver = require('./skill')
const typeResolver = require('./type')
const statisticResolver = require('./statistic')
const technologyResolver = require('./technology')

const rootResolver = {
    ...skillResolver,
    ...typeResolver,
    ...statisticResolver,
    ...technologyResolver
}

module.exports = rootResolver