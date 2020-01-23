const router = require('express').Router();
const sessionUtils = require('../../utilities/utils_session');


// [Admin] Get all of the sessions.
router.get('/', (req, res) => {

    sessionUtils.listAllSessions().then(sessionList => {
        if (!sessionList){
            return res.sendStatus(400);
        } else {
            return res.send(sessionList);
        }
    });
    
});



// [Admin] Remove all of the sessions.
router.delete('/', (req, res) => {

sessionUtils.deleteAllSessions().then(sessionList => {
    if (!sessionList){
        return res.sendStatus(400);
    } else {
        return res.send(sessionList);
    }
});

});


module.exports = router;
