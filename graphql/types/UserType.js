const Post = require('../../Models/Post')
const PostType = require('./PostType')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID
} = require('graphql')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        posts: {
            type: GraphQLList(PostType),
            resolve(user) {
                return Post.find({ userId: user.id })
            }
        }
    })
})

module.exports = UserType