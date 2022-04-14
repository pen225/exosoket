const express = require('express');
const router = express.Router();
const mysqlConnexion = require('../database');


router.get('/', (req, res) =>{
    const userid = req.session.dataUser;
    if (userid) {
        mysqlConnexion.query("SELECT * from messages where userid = ?", [userid.id], (err, result) =>{
            console.log("resultat de message");
            console.log(result);
            res.render('index', {data: result});
        })

    }else{
        res.redirect('/connexion')
    }
    // res.render('index')
})




module.exports = router;