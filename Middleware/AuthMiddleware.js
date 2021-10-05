const jwt = require('jsonwebtoken')
const { parse, print } = require('graphql')

const AuthMiddleware = (req, res, next) => {
    try {
        const query = parse(req.body.query)
        if (query.definitions[0].operation == 'mutation') {
            const queryName = query.definitions[0].selectionSet.selections[0].name.value
            if (queryName === "addPost") {
                try {
                    var token = jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY)
                    req.headers.userId = token.userId
                } catch(e) {
                    return res.status(401).send()
                }
            }
        }
        req.body.query = print(query)
        next()
    }
    catch(e) {
        console.log(e)
        return res.status(500).send()
    }
}

module.exports = AuthMiddleware