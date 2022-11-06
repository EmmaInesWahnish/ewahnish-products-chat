import http from 'http';

const data = JSON.stringify({
    email: 'c@c',
    password: '123'
})

const options = {
    hostname:'localhost',
    port: 8080,
    path: '/api/sessions/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-length': data.length
    }
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

req.write(data);

req.end();