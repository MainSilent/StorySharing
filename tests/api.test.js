require('dotenv').config()
const User = require('../Models/User')
const Post = require('../Models/Post')
const mongoose = require('mongoose')
const { rawRequest, gql } = require('graphql-request')

beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONNECTION)
})

afterAll(async () => { 
    await User.findOneAndDelete({ username: 'test' })
    await Post.findOneAndDelete({ title: 'test' })
    mongoose.connection.close()
})

describe("Test API", () => {
    let token
    const url = 'http://localhost:5000/graphql'

    it("Register", async () => {
        const query = gql`
          mutation {
            register(username: "test", password: "test") {
              token
            }
          }
        `
        const res = await rawRequest(url, query)
        expect(res.status).toBe(200)
    })

    it("Login", async () => {
        const query = gql`
          mutation {
            login(username: "test", password: "test") {
              token
            }
          }
        `
        const res = await rawRequest(url, query)
        expect(res.status).toBe(200)
        token = res.data.login.token
    })

    it("Add Post", async () => {
        const query = gql`
          mutation {
            addPost(title: "test", content: "test", categories: []) {
              title
            }
          }
        `
        const res = await rawRequest(url, query, null, { authorization: token })
        expect(res.status).toBe(200)
    })
})