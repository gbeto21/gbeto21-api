const skillResolver = require('./skill')
const typeResolver = require('./type')

const rootResolver = {
    ...skillResolver,
    ...typeResolver
}

module.exports = rootResolver