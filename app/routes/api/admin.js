const router = require('express').Router();
const sessionUtils = require('../../utilities/utils_session');



// [REPORTING:] Get all reporting for the specific platform and placement mentioned
router.get('/reporting/:platform', (req, res, next) => {

    let platform = req.params.platform;
    
    if (platform != null) {
        platform = platform.toLowerCase();
    }

    switch (platform) {

        case "ios":
            res.locals.query = sessionUtils.listAllValidSessionsForiOS;
            break;
        case "android":
            res.locals.query = sessionUtils.listAllValidSessionsForAndroid;
            break;
        case "windows":
            res.locals.query = sessionUtils.listAllValidSessionsForWindows;
            break;
        default:
            res.locals.query = {};
            break;
    }

    next();

}, (req, res, next) => {

    res.locals.query().then(sessionList => {
        if (!sessionList) {
            return res.sendStatus(400);
        } else {
            return res.send(sessionList);
        }

    })
});



// [Admin] Remove all of the sessions.
router.delete('/admin/delete', (req, res) => {

    sessionUtils.deleteAllSessions().then(sessionList => {
        if (!sessionList) {
            return res.sendStatus(400);
        } else {
            return res.send(sessionList);
        }
    });

});


module.exports = router;
