const jwt = require('jsonwebtoken')
const Post = require('../../Models/Post')
const PostType = require('../types/PostType')
const {
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

const toSlug = title => {
    return title.toLowerCase().trim().replace(/[^\w ]+/g, '').replace(/^\s+|\s+$/gm,'').replace(/ +/g, '-')
}

const addPost = {
    type: PostType,
    args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
        categories: { type: GraphQLNonNull(GraphQLList(GraphQLString)) }
    },
    resolve: async (parent, args, ctx) => {
        args.userId = ctx.headers.userId
        args.title = args.title.trim().replace(/ +/g, ' ')
        args.slug = toSlug(args.title)
        const post = await new Post(args).save()
        return post
    }
}

const updatePost = {
    type: PostType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
        categories: { type: GraphQLNonNull(GraphQLList(GraphQLString)) }
    },
    resolve: async (parent, args, ctx) => {
        const post = await Post.findById(args.id)
        if (!post || post.userId !== ctx.headers.userId)
            throw Error("Post is not available")
        else {
            delete args.id
            args.title = args.title.trim().replace(/ +/g, ' ')
            args.slug = toSlug(args.title)
            return await post.set(args).save()
        }
    }
}

const deletePost = {
    type: PostType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve: async (parent, args, ctx) => {
        const post = await Post.findById(args.id)
        if (!post || post.userId !== ctx.headers.userId)
            throw Error("Post is not available")
        else
            post.delete()
    } 
}

module.exports = {
    addPost: addPost,
    updatePost: updatePost,
    deletePost: deletePost
}