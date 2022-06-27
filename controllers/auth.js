const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  User.find({ email: email, username: username })
    .then((result) => {
      if (result.length > 0) {
        const error = new Error('User or Email Duplicated');
        error.statusCode = 404;
        throw error;
      }
      return result;
    })
    .then((result) => {
      return bcrypt.hash(password, 12);
    })
    .then((result) => {
      const user = new User({
        email: email,
        username: username,
        password: result,
      });
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'signup ok', code: 200, data: result });
    })
    .catch((error) => {
      next(error);
    });
};

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username,password)


  User.findOne({ username : username})
  .then(result => {
    if(!result){
      const error = new Error('Not Found User');
      error.statusCode = 404;
      throw error;
    }
    return result
  })
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    next(error)
  })




  //res.json({ message: 'login work' });
  // const email = req.body.email;
  // const password = req.body.password;
  // let loadedUser;
  // User.findOne({ email: email })
  //   .then(user => {
  //     if (!user) {
  //       const error = new Error('A user with this email could not be found.');
  //       error.statusCode = 401;
  //       throw error;
  //     }
  //     loadedUser = user;
  //     return bcrypt.compare(password, user.password);
  //   })
  //   .then(isEqual => {
  //     if (!isEqual) {
  //       const error = new Error('Wrong password!');
  //       error.statusCode = 401;
  //       throw error;
  //     }
  //     const token = jwt.sign(
  //       {
  //         email: loadedUser.email,
  //         userId: loadedUser._id.toString()
  //       },
  //       'somesupersecretsecret',
  //       { expiresIn: '1h' }
  //     );
  //     res.status(200).json({ token: token, userId: loadedUser._id.toString() });
  //   })
  //   .catch(err => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     next(err);
  //   });
};

