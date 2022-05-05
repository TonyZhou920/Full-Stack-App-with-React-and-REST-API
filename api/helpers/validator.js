// Validation approach adapted from Chinedu Orie 
// https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go

const { check, validationResult } = require('express-validator');
const { sequelize, Course, User } = require('../models');

const userSignUpValidationRules = () => {
  return [
    check('firstName')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "firstName"'),
    check('lastName')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "lastName"'),
    check('emailAddress')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "emailAddress"')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .custom(checkIfEmailExists),
    check('password')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "password"')
      .isLength({ min: 6, max: 18 })
      .withMessage('Password must be between 6 and 18 characters'),
    check('confirmPassword')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "confirmPassword"')
    .custom(comparePasswords),
  ];
}

const userUpdateValidationRules = () => {
  return [
    check('firstName')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "firstName"'),
    check('lastName')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "lastName"'),
    check('emailAddress')
      .optional()
      .isEmail()
      .withMessage('Please provide a valid email address')
      .custom(checkIfEmailExists),
    check('password')
      .optional()
      .isLength({ min: 6, max: 18 })
      .withMessage('Password must be between 6 and 18 characters'),
  ];
}

const courseCreateValidationRules = () => {
  return [
    check('title')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "title"')
      .custom(checkIfCourseExists),
    check('description')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "description"'),
    check('estimatedTime')
      .custom(isInteger)
  ];
}

const courseUpdateValidationRules = () => {
  return [
    check('title')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "title"'),
    check('description')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "description"'),
    check('estimatedTime')
      .custom(isInteger)
  ];
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    "express-validation errors": extractedErrors
  });
}

const checkIfEmailExists = async (val) => {
  const user = await User.findOne({ 
    where: { 
      emailAddress: val
    } 
  });
  if (user) {
    return Promise.reject(`The email address "${val}" is already in use by another user.`);
  }
};

const comparePasswords = (val, { req }) => {
  if (val !== req.body.password) {
    throw new Error('Passwords do not match');
  } else {
    return true;
  }
};

const checkIfCourseExists = async (val) => {
  const course = await Course.findOne({ 
    where: { 
      title: val
    } 
  });
  if (course) {
    return Promise.reject(`A course titled "${val}" already exists.`);
  } 
};

const isInteger = (val, { req }) => {
  const parsedValue = parseInt(req.body.estimatedTime);
  if (isNaN(parsedValue)) {
    throw new Error('Please enter a number for estimatedTime');
  } else {
    return true;
  }
}

module.exports = {
  userSignUpValidationRules,
  userUpdateValidationRules,
  courseCreateValidationRules,
  courseUpdateValidationRules,
  validate
};