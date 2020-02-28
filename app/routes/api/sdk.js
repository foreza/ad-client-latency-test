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
        "ts": req.body["ts"]
    }

    // Retain meaninful session info
    res.locals["client-request-id"] = infoObject["client-request-id"]
    res.locals["u-appbid"] = infoObject["u-appbid"];
    res.locals["as-plid"] = infoObject["as-plid"];
    res.locals["ts"] = infoObject["ts"];

    next();
}

router.post('/', infoLogger, (req, res, next) => {

    // Depending on the mk-ad-slot param, do stuff.
    let mk_ad_slot = req.body["mk-ad-slot"];
    let mk_version = req.body["mk-version"];

    let platform = "";

    if (mk_ad_slot == "300x250") {

        let pathString = "";

        // pr-SIOS-JTATE-20200121

        if (mk_version.indexOf('IOS') > 0){
            pathString = path.join(__dirname + '/mocks/sampleiOSMrec.json')
            platform = "iOS";
        } else {
            pathString = path.join(__dirname + '/mocks/sampleAndroidMrec.json')
            platform = "Android";
        }
        res.sendFile(pathString);
    } else {
        const pathString = path.join(__dirname + '/mocks/noFill.json')
        res.sendFile(pathString)
    }


    console.log(`RID: ${res.locals["client-request-id"]} for as-plid: ${res.locals["as-plid"]} @ ts: ${res.locals["ts"]} for platform ${platform} and adSize ${mk_ad_slot}`)


});


module.exports = router;