const { GraphQLObjectType } = require('graphql')
const UserQuery = require('../graphql/queries/UserQuery')
const { PostQuery, PostsQuery } = require('../graphql/queries/PostQuery')
const { CategoryQuery, CategoriesQuery } = require('../graphql/queries/CategoryQuery')

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: UserQuery,
        post: PostQuery,
        posts: PostsQuery,
        category: CategoryQuery,
        categories: CategoriesQuery
    }
})

module.exports = RootQuery