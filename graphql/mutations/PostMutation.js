const Post = require('../../Models/Post')
const PostType = require('../types/PostType')
const {
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

const addPost = {
    type: PostType,
    args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        slug: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
        categories: { type: GraphQLNonNull(GraphQLList(GraphQLString)) }
    },
    resolve: async (parent, args) => {
        args.userId = 333
        const post = await new Post(args).save()
        return post
    }
}

const deletePost = {
    type: PostType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve: async (parent, args) => {
        const post = await Post.findById(args.id)
        if (!post)
            throw Error("Post is not available")
        else
            post.delete()
    } 
}

module.exports = {
    addPost: addPost,
    deletePost: deletePost
}