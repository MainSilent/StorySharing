const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = require('graphql')

const UserType = GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString }
    })
})

module.exports = UserType