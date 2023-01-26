const users = require("./model")

const userGet = async (accountNumber) => {
    return users.find(accountNumber).lean()
}

const userPut = async (number, content) => {
    return users.findOneAndUpdate(number, {$set: content})
}

const userPost = async (body) => {
    return new users(body)
}

module.exports = {
    userGet,
    userPut,
    userPost
}