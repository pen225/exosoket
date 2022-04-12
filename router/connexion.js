const express = require('express');
const mysqlConnexion = require('../database');
const router = express.Router();

router.get('/', (req, res) =>{
    if (req.session.dataUser) {
        res.redirect('/');
    }else{
        res.render('connexion')
    }
})


router.post('/', (req, res) =>{
    mysqlConnexion.query("SELECT * from user where email = ?", [req.body.email], (err, result) =>{
        console.log(result);
        if (result == "") {
            res.render('connexion');
        }else{
            console.log("email exist");
            // const user = {
            //     id: result[0].id
            // }
            const user = result[0].id
            req.session.dataUser = user;
            console.log(req.session.dataUser);
            res.redirect('/')
        }
    })
})




module.exports = router;