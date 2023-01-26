const { readUser, createUser, updateUser} = require("./service")

async function _get(req, res){
    const userResponse = await readUser({'accountNumber': Number(req.params.number)});
    res.status(200).json(userResponse);
}

async function _post(req, res){
    let user = await createUser(req.body);
    user.save((err) => {
        if(err){
            res.send(`Houve um erro na criação do usuario! Erro:${err.message}`);
        }
        else{
            res.status(201).send('O usuario foi cadastrado com sucesso!');
        }
    })
}

async function _put(req, res){
    const number = req.params.number;

    try {
        updateUser({"accountNumber": number}, req.body);
        res.status(201).send('A atualização foi feita com sucesso!');
    } catch (error) {
        res.send(`Houve um erro na hora de atualizar o usuario! Erro: ${error}`);
    }
}

module.exports = {
    read : _get,
    post : _post,
    put : _put
} 