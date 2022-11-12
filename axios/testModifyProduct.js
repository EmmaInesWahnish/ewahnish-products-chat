import axios from "axios"

const env = async () => {
    let result = await axios.put("http://localhost:8080/api/productos/636e3b4228159c7452e6e301", {
        precio: 3000,
        stock: 30
    });
    let { data, status } = result;
    console.log(data);
    console.log(status);
}

env();
