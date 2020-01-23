const adRequestMetricModel =  require('../models/AdRequestMetric');
const sessionMetricUtils = {};

// [Admin] This utility method creates a new session
sessionMetricUtils.createSession = newSession => {
    return new Promise((resolve, reject) => {
        adRequestMetricModel.create(newSession, (err, createdSession) => {
            if (err) reject(err);
            resolve(createdSession);
        });
    });
}


// [Admin] This utility lists all known distort sessions in the DB
sessionMetricUtils.listAllSessions = () => {
    return new Promise((resolve, reject) => {
      adRequestMetricModel.find({}, function(err, sessionList) {
        if (err){
          reject(err);
        }
        resolve(sessionList);
  
      });
  
  });
  };


// [Admin] This utility deletes all known distort sessions in the DB
sessionMetricUtils.deleteAllSessions = () => {
    return new Promise((resolve, reject) => {
      adRequestMetricModel.remove({}, function(err, emptiness) {
        if (err){
          reject(err);
        }
        resolve(emptiness);
      });
  
  });
  };

module.exports = sessionMetricUtils;
