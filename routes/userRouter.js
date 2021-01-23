var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var Users = require('../models/users');
var passport = require('passport');
var authenticate = require('../middleware/authenticate');
const cors = require('./cors');

router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

router.post('/signup/admin', cors.corsWithOptions, (req, res, next) => {
  var admin = {
    username: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    role: 'admin'
  }
  Users.register(new Users(admin),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else {
        if (req.body.firstname)
          user.firstname = req.body.firstname;
        if (req.body.lastname)
          user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        });
      }
    });
});

router.post('/login', cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: 'Login Unsuccessful!', err: info });
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!' });
      }
      var token = authenticate.getToken({ _id: req.user._id, role: user.role });
      var roleToken = authenticate.getToken({ role: user.role });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, status: 'Login Successful!', token: token, user: { _id: req.user._id, role: user.role } });
    });
  })(req, res, next);
});

router.post('/changepassoword/:id', (req, res, next) => {
  var userId = req.params.id;
  Users.findById(userId).then(function (sanitizedUser) {
    if (sanitizedUser) {
      sanitizedUser.setPassword(newPasswordString, function () {
        sanitizedUser.save();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, message: 'password reset successful' });
      });
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, message: 'This user does not exist' });
    }
  }, function (err) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: false, message: 'Error while updating Password' });
  });
});

router.post('/forgot', async (req, res, next) => {
  // const token = (await promisify(crypto.randomBytes)(20)).toString('hex');
  // const user = Users.find(u => u.email === req.body.email);

  // if (!user) {
  //   req.flash('error', 'No account with that email address exists.');
  //   return res.redirect('/forgot');
  // }

  // user.resetPasswordToken = token;
  // user.resetPasswordExpires = Date.now() + 3600000;

  // const resetEmail = {
  //   to: user.email,
  //   from: 'passwordreset@example.com',
  //   subject: 'Node.js Password Reset',
  //   text: `
  //     You are receiving this because you (or someone else) have requested the reset of the password for your account.
  //     Please click on the following link, or paste this into your browser to complete the process:
  //     http://${req.headers.host}/reset/${token}
  //     If you did not request this, please ignore this email and your password will remain unchanged.
  //   `,
  // };
  // const transport = nodemailer.createTransport(nodemailerSendgrid({
  //   apiKey: SENDGRID_API_KEY,
  // }));
  // await transport.sendMail(resetEmail);
  // req.flash('info', `An e-mail has been sent to ${user.email} with further instructions.`);

  // res.redirect('/forgot');
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.logOut();
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.get('/checkJWTtoken', cors.corsWithOptions, (req, res) => {
  verifyUser((err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({ status: 'JWT invalid!', success: false, err: info });
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({ status: 'JWT valid!', success: true, user: user });

    }
  })(req, res);
});

module.exports = router;
