// var moment = require('moment');

module.exports = function (orm, db) {
  var User = db.define('User', {
    Id          : { type: 'number', required: true },
    username    : { type: 'text', required: true },
    password    : { type: 'text', required: true }
  },
  {
    methods: {
      serialize: function () {
        return {
          username  : this.username,
          password : this.password
        }
      }
    }
  });
};
