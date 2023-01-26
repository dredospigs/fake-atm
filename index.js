require('dotenv').config()
const app = require('./src/app.js');

const port = process.env.DEFAULT_PORT;

app.listen(port, () => {
    console.log(`O caixa eletronico esta rodando na porta ${port}!`)
})