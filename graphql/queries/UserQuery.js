const UserType = require('../types/UserType')
const UserModel = require('../../Models/User')
const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

const UserQuery = new GraphQLObjectType({
    name: 'UserQuery',
    fields: {
        user: {
            type: UserType,
            args: { username: { type: GraphQLString } },
            resolve(parent, args) {
                return UserModel.findOne({ username: args.username })
            }
        }
    }
})