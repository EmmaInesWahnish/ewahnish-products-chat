import axios from "axios"

const env = async () => {
    let result = await axios.post("http://localhost:8080/api/productos", {
        timestamp: Date.now(),
        nombre: "Baliza rotativa",
        descripcion: "Baliza rotativa giratoria imantada 12v",
        codigo: "BG-00-01",
        foto: "/images/baliza-giratoria.jpeg",
        precio: 1390,
        stock: 50
    });
    let { data, status } = result;
    console.log(data);
    console.log(status);
}

env();

