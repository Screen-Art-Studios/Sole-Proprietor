var express = require("express");
var mongodb = require("mongodb");
var _ = require("lodash");
var bodyParser = require("body-parser");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require('bcryptjs');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
jwtOptions.secretOrKey = 'LokisBreath-420';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.findOne({"_id": jwt_payload.id}, function(err, user) {
    if (err) {
          return next(err, false);
      }
      if (user) {
          return next(null, user);
      } else {
          return next(null, false);
      }
  });
});

app.use(passport.initialize());
passport.use(strategy);
app.use(bodyParser.json());

router.post("/", (req,res) => {
  var newUser = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    companyId: req.body.companyId,
    admin: req.body.admin
  })

  newUser.save((err, result) => {
    if (err) {
      res.send(err);
    } else {
      User.findOne({"email": req.body.email}, function (err, users) {
        var payload = {"id": users.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(201).json({userId: users.id, token: token, companyId: users.companyId, admin: users.admin})
      })
    }
  })
})

router.post("/login", (req,res) => {
  User.findOne({"email": req.body.email}, function (err, users) {
    if (err) throw err;
    if (users !== null) {
      bcrypt.compare(req.body.password, users.password, function (err, isMatch) {
        if (err) return err;
        if (isMatch === true) {
          var payload = {"id": users.id};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({userId: users.id, token: token, companyId: users.companyId, admin: users.admin})
        } else {
          res.status(401).send(false);
        }
      })
    } else {
      res.status(401).send(false);
    }
  })
})

router.get("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  var userId = new mongodb.ObjectID(req.params['id']);
  User.findOne({"_id": userId}, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  })
})

router.put("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  var userId = new mongodb.ObjectID(req.params['id']);
  User.find({"_id": userId}, function (err, user) {
    if (err) {
      res.status(500).send(err)
    } else {
      var user = user[0];
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.name = req.body.name || user.name;
      user.companyId = req.body.companyId || user.companyId;
      user.admin = req.body.admin || user.admin;

      user.save(function (err, user) {
        if (err) {
          res.status(500).send(err)
        }
        res.send(user);
      })
    }
  })
})

router.delete("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  var userId = new mongodb.ObjectID(req.params['id']);
  User.find({"_id": userId}).remove().then(() => {
    res.send("Success");
  })
})

module.exports = router;
