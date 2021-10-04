const UserType = require('../types/UserType')
const User = require('../../Models/User')
const {
    GraphQLString
} = require('graphql')

const UserQuery = {
    type: UserType,
    args: { username: { type: GraphQLString } },
    resolve(parent, args) {
        return User.findOne({ username: args.username })
    }
}

module.exports = UserQuery