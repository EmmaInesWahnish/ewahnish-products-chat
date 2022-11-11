import axios from "axios"

const env = async () => {
    let result = await axios.get("http://localhost:8080/api/productos/636e3b4228159c7452e6e301",{ withCredentials: true });
    console.log(result.status);
    console.log(result.data)
}

env();