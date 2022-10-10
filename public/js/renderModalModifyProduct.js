import modifyOneProduct from './modifyOneProduct.js';
import ModifiedProduct from '../Classes/ModifiedProduct.js';
const renderModalModifyProduct = (product) => {
  
  let buttonId = "SM" + product.id;

  document.getElementById('modal').style.display = 'block';

  const modifyForm = document.getElementById('modifyForm');

  modifyForm.innerHTML = `<div class="form-group">
        <span for="productId"><b>Id de Producto ${product.id}</b></span>
      </div>

      <div class="form-group">
        <label for="nombre"><b>Nombre</b></label>
        <input id="nomb" class="form-control" type="text" name="nombre" >
      </div>

      <div class="form-group">
        <label for="descripcion"><b>Descripcion</b></label>
        <input id="desc" class="form-control" type="text" name="descripcion">
      </div>

      <div class="form-group">
        <label for="codigo"><b>Codigo</b></label>
        <input id="code" class="form-control" type="text" name="codigo">
      </div>

      <div class="form-group">
        <label for="foto"><b>Foto (url)</b></label>
        <input id="photo" class="form-control" type="text" name="foto">
      </div>

      <div class="form-group">
        <label for="precio"><b>Precio</b></label>
        <input id="price" class="form-control" type="number" name="precio" >
      </div>

      <div class="form-group">
        <label for="stock"><b>Stock</b></label>
        <input id="quantity" class="form-control" type="text" name="stock" >
      </div>

      <button type="submit" id=${buttonId} class="btn btn-success">Enviar</button>`;

  document.getElementById("nomb").value = product.nombre;
  document.getElementById("desc").value = product.descripcion;
  document.getElementById("code").value = product.codigo;
  document.getElementById("photo").value = product.foto;
  document.getElementById("price").value = product.precio;
  document.getElementById("quantity").value = product.stock;

  let nomb = document.getElementById("nomb");
  let desc = document.getElementById("desc");
  let code = document.getElementById("code");
  let photo = document.getElementById("photo");
  let price = document.getElementById("price");
  let quantity = document.getElementById("quantity");

  nomb.addEventListener('change', function () {
    product.nombre = document.getElementById("nomb").value;
  })
  desc.addEventListener('change', function () {
    product.descripcion = document.getElementById("desc").value;
  })
  code.addEventListener('change', function () {
    product.codigo = document.getElementById("code").value;
  })
  photo.addEventListener('change', function () {
    product.foto = document.getElementById("photo").value;
  })
  price.addEventListener('change', function () {
    product.precio = document.getElementById("price").value;
  })
  quantity.addEventListener('change', function () {
    product.stock = document.getElementById("quantity").value;
  })

  let formUpdate = document.getElementById(buttonId);

  formUpdate.addEventListener('click', function () {
    const modifiedProduct = new ModifiedProduct();
    modifiedProduct.id = product.id;
    modifiedProduct.timestamp = product.timestamp;
    modifiedProduct.nombre = product.nombre;
    modifiedProduct.descripcion = product.descripcion;
    modifiedProduct.codigo = product.codigo;
    modifiedProduct.foto = product.foto;
    modifiedProduct.precio = product.precio;
    modifiedProduct.stock = product.stock,
    
    console.log("Antes de salir ", modifiedProduct);
    
    modifyOneProduct(modifiedProduct);

    document.getElementById('modal').style.display = 'none';
  })

  let closeModal = document.getElementById('close');

  closeModal.addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none';
  })

}

export default renderModalModifyProduct;