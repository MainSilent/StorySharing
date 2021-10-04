const User = require('../../Models/User')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = require('graphql')

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        title: { type: GraphQLString },
        slug: { type: GraphQLString },
        content: { type: GraphQLString },
        dateCreated: { type: GraphQLString },
        user: {
            type: require('./UserType'),
            resolve: post => User.findOne({ id: post.userId })
        }
    })
})

module.exports = PostType