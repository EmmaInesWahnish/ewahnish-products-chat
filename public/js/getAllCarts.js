import getUserCart from "./getUserCart.js";

const getAllCarts = async (whichUser) => {

    const cartRoute = `/api/carrito`

    let allCarts = [];

    let cart_number = '0';

    fetch(cartRoute)
        .then(res => res.json())
        .then(data => {
            if (data.carrito !== undefined) {
                allCarts = [...data.carrito];                
            }
            cart_number = getUserCart(allCarts, whichUser);
            console.log(cart_number);
            return cart_number;
        })
        .catch (err => console.log(err))

}

export default getAllCarts;
