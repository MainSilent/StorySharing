require('dotenv').config()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const UserModel = require('../Models/User')
const PostModel = require('../Models/Post')
const CategoryModel = require('../Models/Category')

const UserSample = {
    username: "Simon",
    password: "$2b$10$YDxRWoo.yzqi.YzLAkAcqueoCWQ2Vckil0K7NAr/0sB9CEyjhMLse"
}

const CategorySample = {
    name: "Technology"
}

const PostSample = {
    title: "How to test",
    slug: "how_to_test",
    content: "This is a test",
    userId: "1"
}

beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONNECTION)
})

afterAll(() => { 
    mongoose.connection.close()
})

describe("Test Models", () => {
    it("is User created properly", async () => {
        const user = await new UserModel({
            username: UserSample.username,
            password: await bcrypt.hash(UserSample.password, await bcrypt.genSalt(10))
        }).save()
        
        expect(user.username).toBe(UserSample.username)
        expect(await bcrypt.compare(UserSample.password, user.password)).toBe(true)
        await user.delete()
    })

    it("is Category created properly", async () => {
        const category = await new CategoryModel({
            name: CategorySample.name
        }).save()
        
        expect(category.name).toBe(CategorySample.name)
        await category.delete()
    })

    it("is Post created properly", async () => {
        const post = await new PostModel({ ...PostSample }).save()
        expect(post).toMatchObject(PostSample)
        await post.delete()
    })
})