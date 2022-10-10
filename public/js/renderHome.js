import renderLoginForm from './renderLoginForm.js';
const renderHome = () => {

    document.getElementById('activeCart').innerHTML = "";
    document.getElementById('cartNumber').innerHTML = "";
    document.getElementById('productCards').innerHTML = "";
    document.getElementById('newProduct').innerHTML = "";
    document.getElementById('oneProduct').innerHTML = "";
    document.getElementById('myCart').innerText = "";
    document.getElementById('productsInCart').innerHTML = "";
    document.getElementById('login').innerHTML = "";
    document.getElementById('register').innerHTML = "";
    document.getElementById('logout').innerHTML = "";
    document.getElementById('root').innerHTML = "";

    const homePage = document.getElementById("homePage")
    
    let show = function (elem) {
        elem.style.display = 'block';
    };
    let hide = function (elem) {
        elem.style.display = 'none';
    };
    hide(homePage)
    let session = "";

    const homeRoute = '/api/sessions';

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    fetch(homeRoute, requestOptions)
        .then(result => result.json())
        .then(json => session = json)
        .finally(() => {
            if (session.user) {
                console.log(session.user)
                show(homePage)
                document.getElementById('welcome').innerHTML = `Te damos la bienvenida ${session.user.first_name} (${session.user.email})! 👋`;
            }
            else {
                renderLoginForm();
            }
        })
        .catch(err => console.log(err))

}

export default renderHome;