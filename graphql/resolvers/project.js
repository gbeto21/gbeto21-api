const fs = require('fs')

const Project = require('../../models/project')
const Technology = require('../../models/technology')
const HttpError = require('../../models/httperror')
const auth = require('../../middleware/checkAuth')
const { log } = require('console')

const getProject = (args, req) => {
    return new Project({
        _id: args.projectInput._id,
        name: args.projectInput.name,
        description: args.projectInput.description,
        image: getImagePath(req),
        url: args.projectInput.url,
        technologys: getTechnologys(args.projectInput.technologys)
    })
}

const getImagePath = req => {
    console.log('Req file: ');
    console.log(req.file);
    if (req.file) {
        const url = req.protocol + '://' + req.get("host")
        let imagePath = url + "/images/" + req.file.filename
        return imagePath
    }
    return 'dymmypath'
}

const getTechnologys = args => {
    const technologys = []
    args.map(technology => {
        technologys.push(
            new Technology({
                _id: technology,
                // name: technology.name
            })
        )
    })

    return technologys
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
        auth.validateUserIsAuthenticated(req)
        try {
            console.log('Creating the project.');
            let result = await getProject(args, req).save()
            return {
                ...result._doc,
                _id: result._doc._id.toString()
            }
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not create the project.', 500)
        }
    },
    updateProject: async (args, req) => {
        auth.validateUserIsAuthenticated(req)
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
    deleteProject: async (args, req) => {
        auth.validateUserIsAuthenticated(req)
        try {
            let result = await Project.findOneAndDelete({ _id: args._id })
            fs.unlink(result.image, error => {
                console.log('Error deleting the image.');
                console.log(error);
            })
        } catch (error) {
            console.log(error);
            return new HttpError('Something went wrong, could not delete the project.', 500)
        }
    }
}