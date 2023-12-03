const PostModel = require('../models/postModel');

class PostController {
    async getAllPosts(req, res) {
        const filter = req.body;
        try {
            const posts = await PostModel.find(filter);
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async getPostById(req, res) {
        try {
            const post = await PostModel.findById(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async createPost(req, res) {
        try {
            const post = await PostModel.create(req.body);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async updatePost(req, res) {
        try {
            const post = await PostModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async deletePost(req, res) {
        try {
            const post = await PostModel.findByIdAndDelete(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async restorePost(req, res) {
        try {
            const post = await PostModel.findByIdAndUpdate(req.params.id, {deleted: false});
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

module.exports = new PostController();