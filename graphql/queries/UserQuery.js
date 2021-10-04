const UserType = require('../types/UserType')
const UserModel = require('../../Models/User')
const {
    GraphQLString
} = require('graphql')

const UserQuery = {
    type: UserType,
    args: { username: { type: GraphQLString } },
    resolve(parent, args) {
        return UserModel.findOne({ username: args.username })
    }
}

module.exports = UserQuery