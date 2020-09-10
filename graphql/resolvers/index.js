const skillResolver = require('./skill')
const typeResolver = require('./type')
const statisticResolver = require('./statistic')
const technologyResolver = require('./technology')
const projectResolver = require('./project')
const userResolver = require('./user')

const rootResolver = {
    ...skillResolver,
    ...typeResolver,
    ...statisticResolver,
    ...technologyResolver,
    ...projectResolver,
    ...userResolver
}

module.exports = rootResolver