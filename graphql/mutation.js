const { GraphQLObjectType } = require('graphql')

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
    }
})

module.exports = Mutation