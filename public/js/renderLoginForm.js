import renderRegisterForm from './renderRegisterForm.js'
import renderHome from './renderHome.js'
const renderLoginForm = () => {

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

    const loginUser = document.getElementById('login');
    const loginForm = document.createElement('div');
    loginForm.setAttribute('class', 'jumbotron');
    loginForm.innerHTML = `<h1 style="color:darkblue;">Log In</h1>
    <br>

    <form id="loginForm">

        <div class="form-group">
            <label for="email"><b>Email</b></label>
            <input id="lemail" class="form-control" type="email" name="email">
        </div>

        <div class="form-group">
            <label for="password"><b>Password</b></label>
            <input id="password" class="form-control" type="password" name="password">
        </div>

        <button type="submit" class="btn btn-success mt-3 mb-5">Submit</button>

    </form>

</div>`

    loginUser.appendChild(loginForm);

    const form = document.getElementById('loginForm');

    let theStatus = "";

    form.addEventListener('submit', evt => {
        evt.preventDefault();
        let data = new FormData(form);
        let obj = {};
        data.forEach((value, key) => obj[key] = value);
        const loginRoute = '/api/sessions/login'

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
        };

        fetch(loginRoute, requestOptions)
            .then(result => result.json())
            .then(json => theStatus = json)
            .finally(() => {
                if (theStatus.status === 'success') {
                    renderHome();
                }
                else {
                    renderRegisterForm();
                }
            })
            .catch(err => console.log(err))

    })

}

export default renderLoginForm;