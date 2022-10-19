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

    let cartId = '';

    let user_avatar = '/uploads/generic-avatar.jpg';

    let user_message = 'Si desea personalizar su avatar puede utilizar Upload Avatar en la barra de menu'

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
                if (session.user.avatar !== null && session.user.avatar !== "" && session.user.avatar) {
                    user_avatar = session.user.avatar;
                    document.getElementById('the-avatar').innerHTML = `<img id="user_avatar" class="avatar" src="${user_avatar}"/>`
                    user_message = ''
                }
                show(homePage)
                document.getElementById('welcome').innerHTML = `<img id="user_avatar" class="avatar" src="${user_avatar}"/>
                    Te damos la bienvenida ${session.user.first_name} (${session.user.email})! 👋
                    <p>${user_message}</p>`;
                document.getElementById('email').value = session.user.email;
                document.getElementById('first_name').value = session.user.first_name;
                document.getElementById('last_name').value = session.user.last_name;
                document.getElementById('avatar').value = session.user.avatar;
                cartId = session.user.cart_number;
                document.getElementById('thisCart').innerHTML = cartId;
            }
            else {
                renderLoginForm();
            }
        })
        .catch(err => console.log(err))

        user_avatar = document.getElementById('user_avatar');



}

export default renderHome;