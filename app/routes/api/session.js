const router = require('express').Router();
const sessionUtils = require('../../utilities/utils_session');


// Get all session data
router.get('/', (req, res) => {

    // We'll enforce a temporary limit for now, this also sorts it by the most recent

    sessionUtils.listAllSessionsWithMaxNumber(50).then(sessionList => {
        if (!sessionList) {
            return res.sendStatus(400);
        } else {
            return res.send(sessionList);
        }
    });

});


//  Create a new session
router.post('/', (req, res, next) => {
    
    sessionUtils.createSession(req.body).then(success => {
        if (success != null) {
            res.sendStatus(201);
        } else {
            res.sendStatus(500);
        }
    })
	

});


router.delete('/:id', (req, res, next) => {

    sessionUtils.deleteSessionGivenUID(req.params.id).then(emptiness => {
        if (!emptiness) {
            return res.sendStatus(400);
        } else {
            return res.send(emptiness);
        }
    });


})


module.exports = router;