const UserQuery = require('../graphql/queries/UserQuery')
const { GraphQLObjectType } = require('graphql')

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: UserQuery
    }
})

module.exports = RootQuery