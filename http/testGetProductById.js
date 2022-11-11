import http from 'http';

const options = {
    host:'localhost',
    port: 8080,
    path: '/api/productos/636e3b4228159c7452e6e301',
    method: 'GET',
    withCredentials: true
}

const req = http.request(options, res =>{
    console.log(`status: ${res.statusCode}`)
    res.on('data', d =>{
        process.stdout.write(d);
    })
})

req.on('error', error =>{
    console.log(error)
})

req.end();