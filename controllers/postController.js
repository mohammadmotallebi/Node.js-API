const PostModel = require('../models/postModel');

class PostController {
    async getAllPosts(req, res) {
        const filter = req.body;
        try {
            const posts = await PostModel.find(filter).and([{deleted: false}])
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async getPostById(req, res) {
        try {
            const post = await PostModel.findById(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async createPost(req, res) {
        try {
            const post = await PostModel.create(req.body);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async updatePost(req, res) {
        try {
            const post = await PostModel.findByIdAndUpdate(req.body._id, req.body);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async deletePost(req, res) {
        try {
            const post = await PostModel.findByIdAndUpdate(req.params.id, {deleted: true})
            const deletedPost = await PostModel.findById(post._id);
            res.status(200).json(deletedPost);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async restorePost(req, res) {
        try {
            await PostModel.findByIdAndUpdate(req.params.id, {deleted: false})
                .then(post => {
                    res.status(200).json(post);
                })

        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    // get all Tags
    async getAllTags(req, res) {
        try {
            const tags = await PostModel.find().distinct('tags');
            res.status(200).json(tags);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
}

module.exports = new PostController();