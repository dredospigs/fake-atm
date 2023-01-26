const repository = require("./repository")

const readUser = async (accountNumber) => {
    return repository.userGet(accountNumber);
}

const updateUser = async (number, content) => {
    return repository.userPut(number, content);
}

const createUser = async(body) => {
    return repository.userPost(body);
}

module.exports = {
    readUser,
    updateUser,
    createUser
} 