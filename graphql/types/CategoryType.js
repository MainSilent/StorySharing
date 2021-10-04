const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = require('graphql')

const CategoryType = GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})

module.exports = CategoryType