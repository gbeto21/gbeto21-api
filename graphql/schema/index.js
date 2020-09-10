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

type Statistic {
    _id: ID!,
    name: String!,
    value: Int!,
    icon: String!
}

input StatisticInput {
    _id: ID,
    name: String!,
    value: Int!,
    icon: String!
}

type Technology {
    _id: ID!,
    name: String!
}

input TechnologyInput {
    _id: ID,
    name: String!
}

type RootQuery{
    skills: [Skill!]!
    types: [Type!]!
    statistics: [Statistic!]!
    technologys: [Technology!]!
}

type RootMutation {
    createSkill(skillInput: SkillInput): Skill
    updateSkill(skillInput: SkillInput): Skill
    deleteSkill(_id: String):Skill

    createType(typeInput: TypeInput):Type
    updateType(typeInput: TypeInput):Type
    deleteType(_id: String):Type

    createStatistic(statisticInput: StatisticInput):Statistic
    updateStatistic(statisticInput: StatisticInput):Statistic
    deleteStatistic(_id: String):Statistic

    createTechnology(technologyInput: TechnologyInput):Technology
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)