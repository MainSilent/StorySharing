const Post = require('../../Models/Post')
const PostType = require('../types/PostType')
const { 
    GraphQLString,
    GraphQLList
} = require('graphql')

const PostQuery = {
    type: PostType,
    args: { slug: { type: GraphQLString } },
    resolve(parent, args) {
        return Post.findOne({ slug: args.slug })
    }
}

const PostsQuery = {
    type: GraphQLList(PostType),
    resolve: () => Post.find()
}

module.exports = {
    PostQuery: PostQuery,
    PostsQuery: PostsQuery
}