const JobModel = require('../models/jobModel');

class JobController {
    async getAllJobs(req, res) {
        const filter = req.body;
        try {
            const jobs = await JobModel.find(filter).and([{deleted: false}])
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async getJobById(req, res) {
        try {
            const job = await JobModel.findById(req.params.id);
            res.status(200).json(job);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async createJob(req, res) {
        try {
            const job = await JobModel.create(req.body);
            res.status(200).json(job);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async deleteJob(req, res) {
        try {
           const job = await JobModel.findByIdAndUpdate(req.params.id, {deleted: true})
           const deletedJob = await JobModel.findById(job._id);
              res.status(200).json(deletedJob);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async restoreJob(req, res) {
        try {
            await JobModel.findByIdAndUpdate(req.params.id, {deleted: false})
                .then(job => {
                    res.status(200).json(job);
                })

        } catch (error) {
            res.status(500).json({ error: error });
        }
    }


}

module.exports = new JobController();


