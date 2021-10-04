const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../Models/User')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

function GenerateToken(username) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        username: username
    }, process.env.PRIVATE_KEY)
}

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
            return { token: GenerateToken(user.username) }
        }
    }
}

const register = {
    type: AuthType,
    args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: async (parent, args) => {
        if (await User.findOne({ username: args.username }))
            throw Error("This username already exists")
        else {
            const user = new User({
                username: args.username,
                password: await bcrypt.hash(args.password, await bcrypt.genSalt(10))
            })
            await user.save()
            return { token: GenerateToken(user.username) }
        }
    }
}

module.exports = {
    login: login,
    register: register
}