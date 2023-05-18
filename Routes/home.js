const express = require('express');
const router = express.Router();


router.get('/', /*auth,*/ (req, res) => {
    res.send('Wanna see tanks?');
   // console.log('User is admin =', req.admin);
});

module.exports = router;