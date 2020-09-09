const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Skill{
    _id: ID!
    name: String!,
    description: String!,
    percent: Int!
}

input SkillInput{
    _id: ID,
    name: String!,
    description: String!,
    percent: Int!,
}

type Type {
    _id: ID!,
    name: String!
}

input TypeInput {
    _id: ID,
    name: String!
}

type RootQuery{
    skills: [Skill!]!
    types: [Type!]!
}

type RootMutation {
    createSkill(skillInput: SkillInput): Skill
    updateSkill(skillInput: SkillInput): Skill
    deleteSkill(_id: String):Skill

    createType(typeInput: TypeInput):Type
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)