require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = require('graphql')
const query = require('./graphql/query')

mongoose.connect(process.env.DB_CONNECTION, err => {
    if (err) throw err
    console.log('Connected to database')
})

const app = express()

const schema = new GraphQLSchema({
    query: query
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(5000, () => console.log('Listening on port 5000'))