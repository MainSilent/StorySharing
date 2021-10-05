const { GraphQLObjectType } = require('graphql')
const { login, register } = require('./mutations/UserMutation')
const { addPost, deletePost } = require('./mutations/PostMutation')

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: login,
        register: register,
        addPost: addPost,
        deletePost: deletePost
    }
})

module.exports = Mutation