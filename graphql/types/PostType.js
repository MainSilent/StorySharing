const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = require('graphql')

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        title: { type: GraphQLString },
        slug: { type: GraphQLString },
        content: { type: GraphQLString },
        dateCreated: { type: GraphQLString }
    })
})

module.exports = PostType