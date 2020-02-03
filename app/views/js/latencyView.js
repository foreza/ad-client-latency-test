$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    // Get the current list of sessions
    getListOfAllSessions(); 

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
            "request_startTime" : "99.023",
            "request_endTime" : "100.012",
            "request_totalTimeElapsed" : "10.0",
			"device_name": "MERRRS",
            "device_ip": "127.1.1.2",
            "ad_request_placement": "32380000",
			"device_platform": "iOS",
			"ad_request_geo": "HivuMind",
			"ad_delivery_status": true
        }),
        processData: false,
        success: function (data, textStatus, jQxhr) {
            console.log("Session created!") },
        error: function (jqXhr, textStatus, errorThrown) { 
            console.log(errorThrown); 
        }
    });

}


function getListOfSessionsForPlatform(platform) {
    $.ajax({
        url: `/api/admin/metrics/${platform}`,
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

// GET a list of all sessions from the  service
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


function deleteSessionByUID(uid) {
    $.ajax({
        url: `/api/admin/${uid}`,
        dataType: 'json',
        type: 'delete',
        contentType: 'application/json',
        processData: false,
        success: function (data, textStatus, jQxhr) {
            console.log(data);
            $(`#${uid}`).remove();
        },
        error: function (jqXhr, textStatus, errorThrown) { console.log(errorThrown); }
    });


}

function admin_delete_all_data() {
    $.ajax({
        url: '/api/admin/admin/delete',
        dataType: 'json',
        type: 'delete',
        contentType: 'application/json',
        processData: false,
        success: function (data, textStatus, jQxhr) {
            console.log(data);
            // Don't wipe the dom.
        },
        error: function (jqXhr, textStatus, errorThrown) { console.log(errorThrown); }
    });

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


function util_formatSessionData(data) {

    var htmlReturn = "";

    for (var i = 0; i < data.length; ++i) {

        htmlReturn += `<tr id='${data[i]._id}'>`
        + "<td class='request_startTime'>" + data[i].request_startTime + "</td>"
        + "<td class='request_endTime'>" + data[i].request_endTime + "</td>"
            + "<td class='time_elapsed'>" + data[i].request_totalTimeElapsed + "</td>"
            + "<td class='device_name'>" + data[i].device_name + "</td>"
            + "<td class='device_ip'>" + data[i].device_ip + "</td>"
            + "<td class='device_platform'>" + data[i].device_platform + "</td>"
            + "<td class='ad_request_placement'>" + data[i].ad_request_placement + "</td>"
            + "<td class='ad_request_geo'>" + data[i].ad_request_geo + "</td>"
            + "<td class='ad_delivery_status'>" + data[i].ad_delivery_status + "</td>"
            + "<td class='auto_uid'>" + data[i]._id + "</td>"
            + "<td class='delete_uid'>" + `<button onclick="deleteSessionByUID('${data[i]._id}')">Remove</button>` + "</td>"
            + "</tr>";

    }

    return htmlReturn;

}