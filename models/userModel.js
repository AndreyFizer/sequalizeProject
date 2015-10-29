/**
 * Created by andrey on 29.10.15.
 */

var Sequelize = require('sequelize');

module.exports = function (sequelize){
    var UserModel = sequelize.define('User',
        {
            username  : Sequelize.STRING,
            birthday  : Sequelize.DATE
        });

    return UserModel;
};