 export const sessionRegister = async(req,res)=>{
    res.status(200).send({status:"success", payload: req.session.user})
}

export const sessionRegisterFail = async (req, res) => {
    console.log("Register failed");
    res.status(500).send({ status: "error", error: "Register failed" })
    req.logger.warn('Intento de registro fallido')
}

export const sessionLogin = async (req, res) => {
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            avatar:req.user.avatar,
            cart_number: req.user.cart_number,
            delivery_address: req.user.delivery_address,
            isAdmin: req.user.isAdmin,
            id:req.user._id
        };

        let userEmail= req.session.user.email;

        res.status(200).send({status:"success", payload: req.session.user})
    }

export const sessionLoginFail = (req,res)=>{
    console.log("login failed");
    res.status(500).send({status:"error",error:"Login failed"})
    req.logger.warn('Intento de login fallido');
}

export const sessionLogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send("error");
        res.status(200).send({ status: "success", payload: "Log Out successful" })
    })
}

export const sessionInfo = (req, res) => {
    res.json({
        status: 'information',
        user: req.session.user
    });
}