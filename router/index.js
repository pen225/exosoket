const express = require('express');
const router = express.Router();
const mysqlConnexion = require('../database');


router.get('/', (req, res) =>{
    const userid = req.session.dataUser;
    if (userid) {
        res.render('index');
        console.log("userid", userid);

        mysqlConnexion.query("SELECT * from messages where userid = ?", [userid], (err, result) =>{
            console.log("resultat de message", result);
        })

    }else{
        res.redirect('/connexion')
    }
    // res.render('index')
})




module.exports = router;