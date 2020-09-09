const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const graphQLSchema = require('./graphql/schema/index')
const graphQLResolvers = require('./graphql/resolvers/index')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())

app.use('/graphql',
    graphqlHTTP({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true
    })
)

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER}.xuzor.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connected to the data base.');
        app.listen(process.env.PORT || 5000)
    })
    .catch(err => {
        console.log(err);
    })