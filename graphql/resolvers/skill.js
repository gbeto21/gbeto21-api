const Skill = require('../../models/skill')
const HttpError = require('../../models/httperror')

const getSkill = args => {
    return new Skill({
        _id: args.skillInput._id,
        name: args.skillInput.name,
        description: args.skillInput.description,
        percent: args.skillInput.percent
    })
}

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

        const skill = getSkill(args)

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
    },
    updateSkill: async args => {

        try {

            const skillData = getSkill(args)
            const filter = { _id: skillData._id }
            return await Skill.findOneAndUpdate(filter, skillData, { new: true })

        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not update the skill.', 500)
        }
    },
    deleteSkill: async args => {
        try {
            const filter = { _id: args._id }
            return await Skill.findOneAndDelete(filter)
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not delete the skill.', 500)
        }
    }
}

