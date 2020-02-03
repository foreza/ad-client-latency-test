
const router = require('express').Router();


const sessions = require('./session');            // For the restful sessions API
const sessionView = require('./admin');         // For administrative / testing, use distort-admin path

router.use('/session', sessions);
router.use('/admin', sessionView);

// Nobody should be accessing this.
router.get('/', (req, res) => {
    return res.sendStatus(403);
});

module.exports = router;
