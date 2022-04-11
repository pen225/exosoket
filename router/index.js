const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    if (req.session.dataUser) {
        res.render('index');
    }else{
        res.redirect('/connexion')
    }
})




module.exports = router;