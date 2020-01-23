var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*

request_totalTimeElapsed    - A string representing the total time elapsed. The client (for now) is responsible for passing in the correct value.
device_name                 - A string representing the device name. Ex: iPhone 6 S+
device_platform             - A string representing the device platform. Ex: iOS, Android, Windows
ad_request_geo              - A string representing the request geo. Ex: US, IN, CA
ad_delivery_status          - A boolean indicating whether the client reported that there was an ad delivered. 

meta - 
    created_at      - Track the date the session was first created
*/


var AdRequestMetricSchema = new Schema({
    request_totalTimeElapsed: {
        type: String,           // TODO: Find a better way to do this.       
        require: true
    },
    device_name: {
        type: String,
        require: true
    },
    device_ip: {
        type: String,
        require: true
    },
    device_platform: {
        type: String,
        require: true
    },
    ad_request_geo: {
        type: String,
        require: true
    },
    ad_delivery_status: {
        type: Boolean,
        require: true
    },
    isTestAdmin: {              // This will allow flagging specific clients with a special build
        type: Boolean,
        require: false
    },
    meta: {
        created_at: {
            type: Date,
            default: Date.now
        }
    }
});

module.exports = mongoose.model('MetricSession', AdRequestMetricSchema);
