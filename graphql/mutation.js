const { GraphQLObjectType } = require('graphql')
const { login, register } = require('./mutations/UserMutation')

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: login,
        register: register
    }
})

module.exports = Mutation