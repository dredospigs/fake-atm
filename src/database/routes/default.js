const userRoutes = require("./user")

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(202).send('oi')
    })

    app.use(
        userRoutes
    );
};

module.exports = routes 