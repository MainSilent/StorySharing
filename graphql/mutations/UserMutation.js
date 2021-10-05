const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../Models/User')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

function GenerateToken(userId) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        userId: userId
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
        if (!user) return null

        if (await bcrypt.compare(args.password, user.password)) {
            return { token: GenerateToken(user.id) }
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
        else if (!/^[a-zA-Z0-9]+$/.test(args.username))
            throw Error("Only Alphanumeric characters are allowed in username")
        else {
            const user = new User({
                username: args.username,
                password: await bcrypt.hash(args.password, await bcrypt.genSalt(10))
            })
            await user.save()
            return { token: GenerateToken(user.id) }
        }
    }
}

module.exports = {
    login: login,
    register: register
}