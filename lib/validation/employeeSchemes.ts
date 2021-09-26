import Joi from 'joi';

export const employeeCreationScheme = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      dateOfBirth: Joi.date().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      salary: Joi.number().min(0).required(),
      annualLeaves: Joi.number().integer().min(0).required(),
    })
    .unknown(false),
};

export const employeePatchScheme = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      dateOfBirth: Joi.date().optional(),
      email: Joi.string().email().optional(),
      phone: Joi.string().optional(),
      salary: Joi.number().min(0).optional(),
      annualLeaves: Joi.number().integer().min(0).optional(),
    })
    .min(1)
    .unknown(false),
};
