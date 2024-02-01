const PostModel = require('../models/postModel');

class PostController {
    async getAllPosts(req, res) { // get all posts
        const filter = req.body; // get filter from request body
        try {
            const posts = await PostModel.find(filter).and([{deleted: false}]) // find all posts with filter
            res.status(200).json(posts);    // return posts in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async getPostById(req, res) { // get post by id
        try {
            const post = await PostModel.findById(req.params.id); // find post by id
            res.status(200).json(post); // return post in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async createPost(req, res) { // create new post
        try {
            const post = await PostModel.create(req.body);  // create new post
            res.status(200).json(post); // return post in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async updatePost(req, res) { // update post
        try {
            const post = await PostModel.findByIdAndUpdate(req.body._id, req.body); // update post by id
            res.status(200).json(post); // return updated post in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async deletePost(req, res) { // delete post
        try {
            const post = await PostModel.findByIdAndUpdate(req.params.id, {deleted: true}) // set post deleted status to true
            const deletedPost = await PostModel.findById(post._id); // find post by id
            res.status(200).json(deletedPost); // return deleted post in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async restorePost(req, res) { // restore post
        try {
            await PostModel.findByIdAndUpdate(req.params.id, {deleted: false}) // set post deleted status to false
                .then(post => {
                    res.status(200).json(post); // return restored post in response
                })

        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    // get all Tags
    async getAllTags(req, res) { // get all tags
        try {
            const tags = await PostModel.find().distinct('tags'); // get all tags
            res.status(200).json(tags); // return tags in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }
}

module.exports = new PostController();