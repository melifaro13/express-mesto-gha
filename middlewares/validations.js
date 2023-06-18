const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/BadRequestError');

const isURL = /^(https?:\/\/)(www\.)?(?!-)[-a-zA-Z0-9@:%._~#=]{1,249}(?<!-)\.[A-Za-z]{2,6}([-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]*)#?$/;

const validationUrl = (v) => {
  if (isURL.test(v)) {
    return v;
  }
  throw new BadRequestError('Неверный адрес URL');
};

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validationUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validationUrl),
  }),
});

const validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validationUrl),
  }),
});

const validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = { isURL, validationLogin, validationCreateUser, validationUpdateUser,validationUpdateAvatar, validationUserId, validationCreateCard, validationCardId };
