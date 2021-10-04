const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = require('graphql')

const PostType = GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        slug: { type: GraphQLString },
        content: { type: GraphQLString },
        dateCreated: { type: GraphQLString }
    })
})

module.exports = PostType