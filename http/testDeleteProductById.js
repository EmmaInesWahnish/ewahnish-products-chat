import http from 'http';

const options = {
    host:'localhost',
    port: 8080,
    path: `/api/productos/636e57e5f4911022997966bc`,
    method: 'DELETE',
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