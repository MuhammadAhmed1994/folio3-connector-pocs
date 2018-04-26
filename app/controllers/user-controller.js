const userModel = require('../models/user-model');
const fs = require('fs');
const path = require('path');
const kue = require('kue');
const queue = kue.createQueue();


module.exports = (function () {
    return {
        /**
         * creating user in database
         */
        createUser: function (cust) {
            userModel.createUser(cust);
        },
        /**
         * this job queues the job in kue for processing
         */
        createFileReadJob: function (fileUrl) {
            var job = queue.create('processfile', fileUrl).save();
            console.log(job);
        },
        /**
         * reading file async for bulk data
         */
        readFileAsync: function (fileUrl) {
            var start = new Date().getTime();
            return new Promise(function (resolve, reject) {
                return fs.readFile(fileUrl, { 'encoding': 'utf-8' }, function (err, data) {
                    var end = new Date().getTime();
                    console.log("difference in time is==", end - start);
                    resolve(data);
                })
            }
            )
        },
        /**
         * reading File in streaming
         */
        readFileStream: function (fileUrl) {
            var start = new Date().getTime();
            var readStream = fs.createReadStream(fileUrl);
            readStream.pipe(res.json(JSON.parse(data)));
            var end = new Date().getTime();
            console.log("difference in time is==", end - start);
        }

    }

}());
