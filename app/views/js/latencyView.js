$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    // Get the current list of sessions
    // getListOfAllSessions(); 

});


// POST a session to the distort service
/*
    -  Note that validation should be done server side as well.
    -  TODO: Properly extend and utilize the success/error handlers.
    -  TODO: Implement some modal to indicate to user when validation catches something.
*/
function createTestSession() {

    $.ajax({
        url: '/api/session/',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify ({
            "request_totalTimeElapsed" : "5.0",
			"device_name": "ME",
			"device_ip": "127.0.0.1",
			"device_platform": "AYE",
			"ad_request_geo": "HiveMind",
			"ad_delivery_status": false
        }),
        processData: false,
        success: function (data, textStatus, jQxhr) {
            console.log("Session created!") },
        error: function (jqXhr, textStatus, errorThrown) { 
            console.log(errorThrown); 
        }
    });

    // $.ajax({
    //     url: '/api/session/test',
    //     dataType: 'json',
    //     type: 'post',
    //     contentType: 'application/json',
    //     data: JSON.stringify ({
    //     }),
    //     processData: false,
    //     success: function (data, textStatus, jQxhr) {
    //         console.log("Session created!") },
    //     error: function (jqXhr, textStatus, errorThrown) { 
    //         console.log(errorThrown); 
    //     }
    // });

}


// GET a list of all sessions from the distort service
function getListOfAllSessions() {
    $.ajax({
        url: '/api/admin/',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        processData: false,
        success: function (data, textStatus, jQxhr) {
            console.log(data);
            $("#sessionList").html(util_formatSessionData(data));
        },
        error: function (jqXhr, textStatus, errorThrown) { console.log(errorThrown); }
    });
}

function util_formatSessionData(data) {

    var htmlReturn = "";

    // request_totalTimeElapsed : "5.0",
	// 		device_name: "ME",
	// 		device_ip: "127.0.0.1",
	// 		device_platform: "AYE",
	// 		ad_request_geo: "HiveMind",
	// 		ad_delivery_status: false,

    for (var i = 0; i < data.length; ++i) {

        htmlReturn += "<tr>"
            + "<td class='time_elapsed'>" + data[i].request_totalTimeElapsed + "</td>"
            + "<td class='device_name'>" + data[i].device_name + "</td>"
            + "<td class='device_ip'>" + data[i].device_ip + "</td>"
            + "<td class='device_platform'>" + data[i].device_platform + "</td>"
            + "<td class='request_geo'>" + data[i].ad_request_geo + "</td>"
            + "<td class='delivery_status'>" + data[i].ad_delivery_status + "</td>"
            + "<td class='auto_uid'>" + data[i]._id + "</td>"
            + "</tr>";

    }

    return htmlReturn;

}

// Utility function to perform some basic input validation
/*
    - UID must be at least 4 characters long (recommended 5-6 characters)
    - UID must be alphaNumeric
    - Regular expression from here: https://stackoverflow.com/questions/336210/regular-expression-for-alphanumeric-and-underscores
    - * Collision checking will be performed by DB *
*/
function util_validateUidInput(input) {
    
    // Match against not just english characters
    if (input.match(/^\w+$/) != null){
        return true;
    } 

    return false;

}