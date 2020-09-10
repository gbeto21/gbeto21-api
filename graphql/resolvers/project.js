const Project = require('../../models/project')
const HTTPError = require('../../models/httperror')

module.exports = {
    projects: async () => {
        try {
            return await Project.find()
            //.populate('technologys')
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not get the projects.', 500)
        }
    }
}