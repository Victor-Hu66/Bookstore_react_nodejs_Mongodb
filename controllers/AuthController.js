exports.authRegister= (req, res) => {

    const {firstName, lastName, email, password} = req.body;
    console.log("Fields: ", firstName, lastName, email, password)
    res.send("Register completed")
}


exports.authLogin = (req, res) => {
    res.send("login completed")
}

