const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../Models/User')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

const AuthType = new GraphQLObjectType({
    name: 'Auth',
    fields: {
        token: { type: GraphQLString }
    }
})

const login = {
    type: AuthType,
    args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: async (parent, args) => {
        const user = await User.findOne({ username: args.username })
        if (await bcrypt.compare(args.password, user.password)) {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                username: user.username
            }, process.env.PRIVATE_KEY)

            return { token: token }
        }
    }
}

const register = {
    type: AuthType,
}

module.exports = {
    login: login,
    register: register
}