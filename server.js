require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = require('graphql')
const Query = require('./graphql/query')
const Mutation = require('./graphql/mutation')
const AuthMiddleware = require('./Middleware/AuthMiddleware')

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('Connected to database'))
    .catch(err => console.error(err))

const app = express()
app.use(express.json())
app.use('/graphql', AuthMiddleware)

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: false
}))

app.listen(5000, () => console.log('Listening on port 5000'))