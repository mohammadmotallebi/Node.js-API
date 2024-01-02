const JobModel = require('../models/jobModel');
const upload = require('../middlewares/uploadMiddleware');

class JobController {
    async getAllJobs(req, res) {
        const filter = req.body;
        try {
            const jobs = await JobModel.find(filter).and([{deleted: false}])
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async getJobById(req, res) {
        try {
            const job = await JobModel.findById(req.params.id);
            res.status(200).json(job);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async createJob(req, res) {
        try {
            const job = await JobModel.create(...req.body, {user_id: req.user._id});
            res.status(200).json(job);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async deleteJob(req, res) {
        try {
            const job = await JobModel.findByIdAndUpdate(req.params.id, {deleted: true})
            const deletedJob = await JobModel.findById(job._id);
            res.status(200).json(deletedJob);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async restoreJob(req, res) {
        try {
            await JobModel.findByIdAndUpdate(req.params.id, {deleted: false})
                .then(job => {
                    res.status(200).json(job);
                })

        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    uploadImage(req, res) {
        upload.array('files', 10)(req, res, function (err) {
            if (err) {
                res.status(500).json({error: err});
            }
            res.status(200).json(req.files);
        })
    }


}

module.exports = new JobController();


