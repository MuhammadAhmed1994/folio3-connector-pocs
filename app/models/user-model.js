const sequelizeModel = require('../config/db-connection');
const sequelize = sequelizeModel.sequelize;
const Sequelize = require('sequelize');

var UserModel = (function () {
    return {
        /**
         * creating user
         */
        createUser: function (userData) {
            let parsedUserData = this.parseUserData(userData);

            const User = sequelize.define('users', {
                firstname: Sequelize.STRING,
                lastname: Sequelize.STRING,
                email: Sequelize.STRING
            });
            sequelize.sync()
                .then(() => User.create(parsedUserData))
                .then((response) => {
                    console.log(response.toJSON());
                });
        },
        /**
         * this method will parse data
         */
        parseUserData: function (userData) {
            return userData;
        }
    }
}());

module.exports = UserModel;
