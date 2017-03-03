
var assets = require(__root + "public/assets.json"); // eslint-disable-line

module.exports = {
  login: (req, res, next) => {
    console.log('test ',req.body.username+" "+req.body.password)
    req.models.User.find({username:req.body.username, password:req.body.password}).count(function(err, state){
        if (err) return next(err);

        if (state == 1){
            res.send('success');
        }else{
            res.send('user not found with name: '+req.body.username)
        }
    })
  },
  getAll: (req, res, next) => {
    req.models.User.find().all(function (err, user) {
      if (err) return next(err);

      var items = user.map(function (value, key) {
        return value.serialize();
      });

      res.send(items);
    })
  }
};