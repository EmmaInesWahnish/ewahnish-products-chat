import express from 'express';
import handlebars from 'express-handlebars';

//needed for __dirname in handlebars
import { dirname } from 'path';
import { fileURLToPath } from 'url';

//AnyContainer is generic Containes for Class
import AnyContainer from './api/Container.js'

const Products = new AnyContainer('./files/productos.txt');

let productos = [];

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.engine('hbs',
  handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts/', //ruta a la plantilla principal
    partialsDir: __dirname + '/views/partials/' //ruta a los parciales
  })
);

//Template engine setting
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  try {
    productos = await Products.getAll()
  }
  catch (error) {
    console.log(error);
  }
  res.render('form', { productos });
});

app.get('/productos', async (req, res) => {
  try {
    productos = await Products.getAll()
  }
  catch (error) {
    console.log(error);
  }
  res.render('products', { productos });
});

app.post('/productos', async (req, res) => {
  console.log(req.body)
  let element = [{
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail
  }]
  console.log(element);
  if (element) {
    try {
      await Products.saveArray(element);
      try {
        productos = await Products.getAll();
        res.redirect('/')
      }
      catch (error) {
        console.log(error)
      }
    }
    catch (error) {
      console.log(error);
    }
  }
});

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
