const JobModel = require('../models/jobModel');
const upload = require('../middlewares/uploadMiddleware');

class JobController {
    async getAllJobs(req, res) { // get all jobs
        const filter = req.body; // get filter from request body
        try {
            const jobs = await JobModel.find(filter).and([{deleted: false}]) // find all jobs with filter
            res.status(200).json(jobs); // return jobs in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async getJobById(req, res) { // get job by id
        try {
            const job = await JobModel.findById(req.params.id); // find job by id
            res.status(200).json(job); // return job in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async createJob(req, res) { // create new job
        try {
            const job = await JobModel.create(...req.body, {user_id: req.user._id}); // create new job with user id
            res.status(200).json(job); // return job in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async deleteJob(req, res) { // delete job
        try {
            const job = await JobModel.findByIdAndUpdate(req.params.id, {deleted: true}) // set job deleted status to true
            const deletedJob = await JobModel.findById(job._id); // find job by id
            res.status(200).json(deletedJob); // return deleted job in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async restoreJob(req, res) { // restore job
        try {
            await JobModel.findByIdAndUpdate(req.params.id, {deleted: false}) // set job deleted status to false
                .then(job => {
                    res.status(200).json(job); // return restored job in response
                })

        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    uploadImage(req, res) { // upload image
        upload.array('files', 10)(req, res, function (err) {  // upload image with multer
            if (err) {
                res.status(500).json({error: err}); // return error in response if any
            }
            res.status(200).json(req.files); // return uploaded image in response
        })
    }


}

module.exports = new JobController();


