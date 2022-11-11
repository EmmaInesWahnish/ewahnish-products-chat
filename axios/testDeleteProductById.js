import axios from "axios"

const env = async () => {
    let result = await axios.delete("http://localhost:8080/api/productos/636e57e5f4911022997966bc",{ withCredentials: true });
    console.log(result.status);
    console.log(result.data)
}

env();