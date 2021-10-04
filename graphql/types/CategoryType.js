const Post = require('../../Models/Post')
const PostType = require('./PostType')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID
} = require('graphql')

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        posts: {
            type: GraphQLList(PostType),
            resolve: (category) => {
                return Post.find({ categories: { $regex: category.name } })
            }
        }
    })
})

module.exports = CategoryType