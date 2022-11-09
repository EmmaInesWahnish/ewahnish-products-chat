import axios from "axios"

const env = async () => {
    let reslogin = await axios.post ("http://localhost:8080/api/sessions/login",{
        email: 'c@c',
        password: '123'
    });
    let {data, status } = reslogin;
    console.log(data);
    console.log(status);
}

env();

