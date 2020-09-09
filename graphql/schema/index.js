const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Skill{
    _id: ID!
    name: String!,
    description: String!,
    percent: Int!
}

input SkillInput{
    _id: ID!,
    name: String!,
    description: String!,
    percent: Int!,
}

type RootQuery{
    skills: [Skill!]!
}

type RootMutation {
    createSkill(skillInput: SkillInput): Skill
    updateSkill(skillInput: SkillInput): Skill
    deleteSkill(_id: String):Skill
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)