const AnyContainer = require("./api/Container.js");
const express = require('express');
const routerProducts = require('./routers/routerProducts.js')
const routerCart = require('./routers/routerCart.js')

const app = express();

// this code is necessary for express to understand json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);


/* Server Listen */
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Server http listening at port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))