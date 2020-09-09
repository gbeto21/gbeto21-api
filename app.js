const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const Skill = require('./models/skill')
const app = express()

app.use(bodyParser.json())

app.use('/graphql',
    graphqlHTTP({
        schema: buildSchema(`
                type Skill{
                    _id: ID!
                    name: String!,
                    description: String!,
                    percent: Int!
                }

                input SkillInput{
                    name: String!,
                    description: String!,
                    percent: Int!
                }

                type RootQuery{
                    skills: [Skill!]!
                }

                type RootMutation {
                    createSkill(skillInput: SkillInput): Skill
                }

                schema {
                    query: RootQuery
                    mutation: RootMutation
                }
            `),
        rootValue: {
            skills: () => {
                return Skill.find()
                    .then(skills => {
                        return skills.map(skill => {
                            return { ...skill._doc, _id: skill.id }
                        })
                    })
                    .catch(err => {
                        throw err;
                    })
            },
            createSkill: args => {

                const skill = new Skill({
                    name: args.skillInput.name,
                    description: args.skillInput.description,
                    percent: args.skillInput.percent
                })

                return skill
                    .save()
                    .then(result => {
                        console.log(result);
                        return { ...result._doc, _id: result._doc._id.toString() }
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    })
            }
        },
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