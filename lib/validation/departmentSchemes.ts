import Joi from 'joi';

export const departmentCreationScheme = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
    })
    .unknown(false),
};

export const departmentPatchScheme = {
  body: Joi.object()
    .keys({
      name: Joi.string().optional(),
      description: Joi.string().optional(),
    })
    .min(1)
    .unknown(false),
};
