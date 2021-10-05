require('dotenv').config()
const User = require('../Models/User')
const Post = require('../Models/Post')
const mongoose = require('mongoose')
const { rawRequest, gql } = require('graphql-request')

beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONNECTION)
    await User.findOneAndDelete({ username: 'test' })
})

afterAll(() => { 
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
})