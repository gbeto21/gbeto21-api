const Skill = require('../../models/skill')

module.exports = {
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
}