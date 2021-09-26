import Joi from 'joi';

export const employeeCreationScheme = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      dateOfBirth: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      salary: Joi.string().required(),
      annualLeaves: Joi.string().required(),
    })
    .unknown(false),
};

export const employeePatchScheme = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      dateOfBirth: Joi.string().optional(),
      email: Joi.string().optional(),
      phone: Joi.string().optional(),
      salary: Joi.string().optional(),
      annualLeaves: Joi.string().optional(),
    })
    .min(1)
    .unknown(false),
};
