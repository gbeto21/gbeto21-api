const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')

const graphQLSchema = require('./graphql/schema/index')
const graphQLResolvers = require('./graphql/resolvers/index')

const auth = require('./middleware/checkAuth')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(auth.validateUserToken)

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