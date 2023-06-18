const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload;
  next();
};



// const jwt = require('jsonwebtoken');

// const handleAuthError = (res) => {
//   res
//     .status(401)
//     .send({ message: 'Необходима авторизация' });
// };

// const extractBearerToken = (header) => {
//   return header.replace('Bearer ', '');
// };

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return handleAuthError(res);
//   }

//   const token = extractBearerToken(authorization);
//   let payload;

//   try {
//     payload = jwt.verify(token, 'super-strong-secret');
//   } catch (err) {
//     return handleAuthError(res);
//   }

//   req.user = payload;

//   next();
// };