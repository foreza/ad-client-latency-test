const router = require('express').Router();
const sessionUtils = require('../../utilities/utils_session');


// [Admin] Get all of the sessions.
router.get('/', (req, res) => {

    sessionUtils.listAllSessions().then(sessionList => {
        if (!sessionList) {
            return res.sendStatus(400);
        } else {
            return res.send(sessionList);
        }
    });

});

// [REPORTING:] Get all reporting for the specific platform and placement mentioned
router.get('/metrics/:platform', (req, res, next) => {

    let platform = req.params.platform;

    console.log(`Platform is: ${req.params.platform}`)

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


router.delete('/:id', (req, res, next) => {

    sessionUtils.deleteSessionGivenUID(req.params.id).then(emptiness => {
        if (!emptiness) {
            return res.sendStatus(400);
        } else {
            return res.send(emptiness);
        }
    });


})


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
