const Category = require('../../Models/Category')
const CategoryType = require('../types/CategoryType')
const {
    GraphQLString,
    GraphQLList
} = require('graphql')

const CategoryQuery = {
    type: CategoryType,
    args: { name: { type: GraphQLString } },
    resolve(parent, args) {
        return Category.findOne({ name: args.name })
    }
}

const CategoriesQuery = {
    type: GraphQLList(CategoryType),
    resolve: () => Category.find()
}

module.exports = {
    CategoryQuery: CategoryQuery,
    CategoriesQuery: CategoriesQuery
}