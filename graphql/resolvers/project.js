const Project = require('../../models/project')
const Technology = require('../../models/technology')
const HttpError = require('../../models/httperror')

const getProject = args => {
    return new Project({
        _id: args.projectInput._id,
        name: args.projectInput.name,
        description: args.projectInput.description,
        image: args.projectInput.image,
        url: args.projectInput.url,
        technologys: getTechnologys(args.projectInput.technologys)
    })
}

const getTechnologys = args => {
    const technologys = []
    args.map(technology => {
        technologys.push(
            new Technology({
                _id: technology._id,
                name: technology.name
            })
        )
    })

    return technologys
}

const validateUserAuthenticated = req => {
    if (!req.isAuth) {
        throw new HttpError('Restricted access', 403)
    }
}

module.exports = {
    projects: async () => {
        try {
            return await Project.find().populate('technologys')
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not get the projects.', 500)
        }
    },
    createProject: async (args, req) => {
        validateUserAuthenticated(req)
        try {
            let result = await getProject(args).save()
            return {
                ...result._doc,
                _id: result._doc._id.toString()
            }
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not create the project.', 500)
        }
    },
    updateProject: async args => {
        try {
            return await Project.findOneAndUpdate(
                { _id: args.projectInput._id },
                getProject(args),
                { new: true }
            )
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not update the project.', 500)
        }
    },
    deleteProject: async args => {
        try {
            return await Project.findOneAndDelete({ _id: args._id })
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not delete the project.', 500)
        }
    }
}