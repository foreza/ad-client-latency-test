const router = require('express').Router();
const sessionUtils = require('../../utilities/utils_session');


// [Admin] Create a new session
router.post('/', (req, res) => {

	const {
		request_startTime,
		request_endTime, 
		request_totalTimeElapsed, 
		device_name, 
		device_ip,
		device_platform, 
		ad_request_placement,
		ad_request_geo, 
		ad_delivery_status, 
	} = req.body;
	console.log('POST request from: ', device_ip);

	console.log('Creating new session' );
	sessionUtils.createSession(
		{ 
			request_startTime,
			request_endTime, 
			request_totalTimeElapsed, 
			device_name, 
			device_ip,
			device_platform,
			ad_request_placement, 
			ad_request_geo, 
			ad_delivery_status, 
		}), () => res.sendStatus(400);
	res.sendStatus(201);

});


// [Admin] Create a new session
router.post('/test', (req, res) => {

	console.log('Testing a POST request from: ', device_ip);

	console.log('Creating new session' );
	sessionUtils.createSession(
		
		{ 
			request_startTime: "8:55:99",
			request_endTime : "9:00:99", 
			request_totalTimeElapsed : "5.0",
			device_name: "ME",
			device_ip: "127.0.0.1",
			device_platform: "AYE",
			ad_request_placement: "380000",
			ad_request_geo: "HiveMind",
			ad_delivery_status: false,
		}), () => res.sendStatus(400);
	res.sendStatus(201);

});


module.exports = router;
