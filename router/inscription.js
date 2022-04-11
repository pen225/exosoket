const express = require('express');
const mysqlConnexion = require('../database');
const router = express.Router();


router.get('/', (req, res) =>{
    res.render('inscription');
})

router.post('/', (req, res) =>{
    let sql = "INSERT INTO user (nom, prenom, email, password) VALUES (?,?,?,?)"
    mysqlConnexion.query(sql,[req.body.nom,req.body.prenom,req.body.email,req.body.password], (err, result) =>{
        if (err) {
            console.log("Erreur d'inscription", err);
            res.render('inscription', {erreur: "Email exist"});
        }else{
            console.log("Inscription réussie", result);
            res.redirect('/connexion')
        }
    })
})



module.exports = router;