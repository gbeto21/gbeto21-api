const { buildSchema } = require('graphql')

module.exports = buildSchema(`
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
`)