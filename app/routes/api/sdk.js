const router = require('express').Router();
var path = require('path');


// Metrics (to be used for later)
const infoLogger = (req, res, next) => {

    const infoObject = {
        "mk-ad-slot:" : req.body["mk-ad-slot"],
        "u-appbid": req.body["u-appbid"],
        "client-request-id"	: req.body["client-request-id"],
        "as-plid" : req.body["as-plid"],
        "format"   : req.body["format"],
        "im-plid"   : req.body["im-plid"],
        "adtype"    : req.body["adtype"],
        "int-origin": req.body["int-origin"],
        "u-appsecure-dict": req.body["u-appsecure-dict"],        
        "u-appdnm": req.body["u-appdnm"],
        "mk-version": req.body["mk-version"],
    }

    console.log(infoObject);

    // Retain meaninful session info
    res.locals["client-request_id"] = infoObject["client-request-id"]
    res.locals["u-appbid"] = infoObject["u-appbid"];

    next();
}

router.post('/', infoLogger, (req, res, next) => {

    // Depending on the mk-ad-slot param, do stuff.
    let mk_ad_slot = req.body["mk-ad-slot"];
    

    // TODO:

    // retrieve mk-ad-slot=320x50 or mk-ad-slot=300x250

    if (mk_ad_slot == "300x250") {
        const pathString = path.join(__dirname + '/mocks/sampleMrec.json')
        console.log(`rewriting mrec from path ${pathString}`);
        res.sendFile(pathString);
    } else {
        const pathString = path.join(__dirname + '/mocks/noFill.json')
        res.sendFile(pathString)
        console.log("nothing happened - not an mrec");
    }
});


module.exports = router;