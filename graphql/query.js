const UserQuery = require('../graphql/queries/UserQuery')
const { PostQuery, PostsQuery } = require('../graphql/queries/PostQuery')
const { GraphQLObjectType } = require('graphql')

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: UserQuery,
        post: PostQuery,
        posts: PostsQuery
    }
})

module.exports = RootQuery