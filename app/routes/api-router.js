const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/user-controller');

router.get('/', (req, res) => {
    res.end("find documentation to find all the routes");
});
router.get('/customer', (req, res) => {
    res.json({
        status: true,
        data: {
            items: [
                {
                    id: '1',
                    name: 'eventstableitem1'
                }
            ]
        },

        total: 1
    }
    )
});
//creating customer
router.post('/customer', (req, res) => {
    var cust = {
        firstname: "Ahmed",
        lastname: "Ali",
        email: "muhammad_ahmed1994@outlook.com",
    };
    userController.createUser(cust);
    res.end("ended")
});
//reading stream of file
router.get('/read-file-stream', (req, res) => {
    let fileUrl = path.join(__dirname, './test-file.json');
    userController.readFileStream(fileUrl);
});
//reading async file
router.get('/read-file', (req, res) => {
    let fileUrl = path.join(__dirname, './test-file.json');
    let userPromise = userController.readFileAsync(fileUrl);
    console.log(userPromise);
    userPromise.then(function (data) {
        res.json(JSON.parse(data));
    })

});
//queuing job for processing
router.get('/queue-file', (req, res) => {
    res.end("job queued");

});

module.exports = router;