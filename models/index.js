/**
 * Created by andrey on 29.10.15.
 */

var Models = function (sequelize){

    this.User =  require('./userModel')(sequelize);
};

module.exports = Models;