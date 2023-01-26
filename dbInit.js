require('dotenv').config()
const app = require('./src/database/app.js');

const port = process.env.DB_PORT;

app.listen(port, () => {
    console.log(`O banco está rodando na porta ${port}!`)
})